'use strict';

module.exports = function(gulp, plugins, options) {
  return function (code) {
    plugins.gutil.log('Stopping server');
    plugins.server.kill(function () {
      process.exit(code);
    });
  };
};
