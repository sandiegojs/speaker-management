'use strict';

// Runs unit tests with karma
module.exports = function(gulp, plugins, options) {
  return function (done) {
    var Server = plugins.karma.Server;
    new Server({
      configFile: options.configPath,
      singleRun: options.singleRun,
      autoWatch: options.autoWatch,
      reporters: options.reporters
    }, done).start();
  };
};
