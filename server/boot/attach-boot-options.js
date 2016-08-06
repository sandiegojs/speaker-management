'use strict';

module.exports = function(app) {
  var log = require('debug')('boot:attach-boot-options');
  log('attach boot options');

  var bootOptions = app.get('boot');

  if (bootOptions.maxListeners) {
    require('events').EventEmitter.prototype._maxListeners =
      bootOptions.maxListeners;
  }

  // Attach socketServer if available
  if (bootOptions.socketServer) {
    app.set('io', bootOptions.socketServer);
  }

  // Attach socketServer if available
  if (bootOptions.collectStats) {
    app.set('collectStats', bootOptions.collectStats);
  }

  // Identify worker associated with app server if available
  app.set('worker', {
    id: bootOptions.id
  });

  return app;
};
