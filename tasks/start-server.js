'use strict';

module.exports = function (gulp, plugins, options) {
  var _ = require('underscore');
  var defaultOptions = {
    path: '.',
    delay: 3000,
    env: {
      PORT: 3001
    }
  };
  _.defaults(options, defaultOptions);
  return function (done) {
    plugins.server.listen(options, done);
  };
};
