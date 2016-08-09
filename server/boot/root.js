'use strict'
module.exports = function(server) {
  var log = require('debug')('boot:root')
  log('show status at /')

  // Install a `/` route that returns server status
  var router = server.loopback.Router()
  router.get('/', server.loopback.status())
  server.use(router)
}
