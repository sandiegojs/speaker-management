'use strict';

var path = require('path');

module.exports = function(app) {
  var log = require('debug')('boot:storage');
  log('set up file storage');

  var ds = app.loopback.createDataSource({
    connector: require('loopback-component-storage'),
    provider: 'filesystem',
    root: path.join(__dirname, '../', '../', 'storage')
  });
  var container = ds.createModel('Container');

  app.model(container);

};
