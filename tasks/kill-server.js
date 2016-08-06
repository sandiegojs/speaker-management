'use strict';

module.exports = function(gulp, plugins, options) {
  return function (done) {
    plugins.server.kill(done);
  };
};
