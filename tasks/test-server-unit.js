'use strict';

var reporters = require('./jasmine-reporters');

module.exports = function(gulp, plugins, options) {
  // Convert the text to an actual reporter
  var reporter = options.jasmine.reporter;

  switch (reporter) {
    case 'terminal':
      options.jasmine.reporter = reporters[reporter];
      break;
    // Add other reporters as necessary, pass in reporter options from
    // options.jasmine.reporterOptions
    default:
      options.jasmine.reporter = null;
  }
  return function () {
    return gulp.src(options.src)
      .pipe(plugins.jasmine(options.jasmine));
      //.pipe(plugins.istanbul.writeReports())
      //.pipe(plugins.istanbul.enforceThresholds(options.coverage.enforce));
  };
};
