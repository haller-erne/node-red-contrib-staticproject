// Serve static files through node-red with a project specific root
// folder (if projects are active)
//
// To use, add the following nodes:
//
//    httpIn  -->  static node (this one)  --> httpResponse
//
// Setup the nodes as follows (typically to serve static files, e.g. for a
// template node or other project specific resources like png, js, ...):
// - httpIn: Method = GET, URL = /static/*
// - static: Folder = /home 
// - httpResponse: (no settings needed)
//
// This setup will serve files stored in <project>/home to be accessed through
// the http://<node-red-url>/static endpoint. 
// 
// See the following for the original static node and informaiton 
// about how to get the git project folder:
// - https://flows.nodered.org/node/node-red-contrib-static
// - https://discourse.nodered.org/t/project-directory-path/14424/8
//
const path        = require('path')
const serveStatic = require('serve-static')

let StaticInitFunc = function (RED) {
  function StaticNode(n) {
    RED.nodes.createNode(this, n)

    const node = this
    const folder = n.folder
    
    let baseFolder = ''
    const settings = RED.settings
    const userDir = settings.userDir
    const project = settings.get('projects')
    // Check, if the project mode (GIT) is active
    if (project && project.activeProject) {
      // yes, build the "new" httpStatic path - userdir + project + folder
      baseFolder = path.join(userDir, 'projects', project.activeProject, folder)

      // directly setting the httpStatic folder does not work: 
      // settings.set(httpStatic, newStatic)
    } 
    else {
      // no, use userdir + folder
      baseFolder = path.join(userDir, folder)
    }
    console.debug('node-red-contrib-static: Serving: ', baseFolder)

    const serve = serveStatic(baseFolder, { index: ["index.html", "index.htm"] })

    node.on("input", function (msg) {
      RED.log.info('My custom node received a new message!')
      const req = msg.req
      const res = msg.res._res
      req.pathname = req.path = req.url = `/${Object.values(req.params)[0]}`
      serve(req, res, function (t) {
        node.send(msg)
      });
    });
  }
  RED.nodes.registerType("static", StaticNode)
};

module.exports = StaticInitFunc
