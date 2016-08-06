module.exports = function enableAuthentication(server) {
  'use strict';
  var log = require('debug')('boot:authentication');
  log('enable authentication');

  // enable authentication
  server.enableAuth();
};
