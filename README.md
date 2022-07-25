# node-red-contrib-static

This Node-RED node allows serving static files from local directories over HTTP/HTTPS.

If node-red is running in project mode, then the path specified in the nodes folder parameter (e.g. "/home") 
is relative to the projects home directory, else the userDir is used as base path.

![flow](flow.png)

# Install

`npm i node-red-contrib-staticproject`

# Use

Input the directory path that will act as the root in the input field `folder`. NOTE: make sure to put a wildcard in the HTTP/HTTPS node path after the root url path, so that the file / directory names are passed to the static node. e.g.: `prefix/*`

Typical usage of this node is to prefix it with a `httpIn` node and add its output to a `httpResponse` node, e.g.

	httpIn --> staticproject --> httpResponse
	
The `URL` parameter defined in the `httpIn`-node will define the endpoint for web requests, the `Files` parameter 
in the `staticporject`-node will define the (relativ) files system path where the webserver looks for the requested
file. To serve a full folder, use a `URL` similar to `/path/*` - this will then match all files (see the `serve-static` npm 
module for more information).

# LICENSE

[ISC](https://opensource.org/licenses/ISC)

# Original code

[Digital Arsenal Github](https://github.com/DigitalArsenal/node-red-contrib-static)

# Contact

[ogsadmin@node-red.haller-erne.de](mailto:ogsadmin@node-red.haller-erne.de)