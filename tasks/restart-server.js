'use strict';

module.exports = function(gulp, plugins, options) {
  return function(cb){
    return plugins.server.changed(cb);
  };
};
