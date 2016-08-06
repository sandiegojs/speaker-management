'use strict';

module.exports = function(gulp, plugins, options) {
  return function () {
    return gulp.src(options.src)
      //.pipe(plugins.istanbul())
      //.pipe(plugins.istanbul.hookRequire())
      .pipe(gulp.dest(options.dist));
  };
};
