'use strict'

module.exports = function enableAuthentication(server) {
  const log = require('debug')('boot:authentication')
  log('enable authentication')

  // enable authentication
  server.enableAuth()
}
