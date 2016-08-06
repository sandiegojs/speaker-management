# SanDiego.js Speaker Management

## Getting Started

`npm install`

`npm start`

Browse to http://localhost:3000/explorer to get REST API documentation.

## Environment Variables

Use the following environment variables to maximize your development experience:

``

PORT=3000

DEBUG=plugins:*,io:*,error

DEBUG_COLORS=1

DEBUG_FD=1

NODE_ENV=development

WORKERS=1

BROKERS=1

``


## Developing the App Server

The app server follows standard loopback conventions for directory structure
(server, client, common, etc).
See https://docs.strongloop.com/display/public/LB/LoopBack for more information.

## Developing Plugins

Plugins are packages of server and/or client functionality that can be loaded
into the server through configuration. You add the plugin package path and
options in `plugins/index.js`. The configuration is used by the
`server/boot/plugin-loader.js` to add the functionality to the server. Plugins
packages can be located anywhere but by convention they should be put in the
`plugins` or `node_modules` directory.

## During Development

To restart the server when code changes, start the server with
`npm run develop`.

To run the entire test suite (lint and server unit tests), use `npm run test`.




