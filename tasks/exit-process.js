'use strict';

module.exports = function(gulp, plugins, options) {
  return function(done){
    // Using the callback before process.exit helps log seem finished
    done();
    process.exit();
  };
};

