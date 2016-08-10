'use strict';

// Project specific paths
var srcLint = [
  'client/**/*.js',
  'plugins/**/*.js',
  'server/**/*.js',
  'socket/**/*.js',
  'spec/**/*.js',
  'tasks/**/*.js',
  '!client/js/**/*.js',
  '!plugins/**/client/js/**/*.js',
  '!plugins/**/assets/js/**/*.js',
  '!plugins/theme/**/*.js'
];
var jsHintReporter = 'default';
var srcServerUnitTests = [
  'server/**/*.spec.js',
  'socket/**/*.spec.js',
  'plugins/**/server/**/*.spec.js'
];
var jasmineOptions = {
  verbose: true,
  includeStackTrace: true
};
var srcCoveredServerCode = [
  './server/**/*.js',
  './socket/**/*.js',
  './plugins/**/*.js',
  '!./plugins/**/client/**/*.js',
  '!./plugins/**/node_modules/**/*.js',
  '!./**/*.spec.js',
  '!./**/spec/**/*.js'
];
var coverageOptions = {
  enforce: {
    thresholds: {
      global: 50
    }
  }
};
var karmaConfigPath = __dirname + '/karma.conf.js';
var karmaReporters = ['dots'];
var srcApiTests = ['./spec/api/**'];
var srcIntegrationTests = ['spec/integration'];
var srcServerWatch = [
  './.env',
  './server/**/*.js',
  './server/*.json',
  './socket/**/*.js',
  './plugins/**/*.js',
  './plugins/**/*.marko',
  '!./plugins/**/client/**/*.js'
];
var serverOptions = {
  path: '.',
  env: {
    DEBUG: 'plugins:*,io:*,error',
    DEBUG_COLORS: 1,
    DEBUG_FD: 1,
    NODE_ENV: 'development',
    WORKERS: 1,
    BROKERS: 1
  }
};

var gulp = require('gulp');

require('require-dir')('./gulp-tasks');

// Plugins needed for tasks
var plugins = {
  spawn: require('child_process').spawn,
  gutil: require('gulp-util'),
  gulpSequence: require('gulp-sequence'),
  server: require('gulp-develop-server'),
  jasmine: require('gulp-jasmine'),
  karma: require('karma'),
  jshint: require('gulp-jshint')
  //istanbul: require('gulp-istanbul')
};

// Utility function to set up the task
function getTask(task, options){
  return require('./tasks/' + task)(gulp, plugins, options);
}

// Supporting tasks
gulp.task('server:start', getTask('start-server', serverOptions));
gulp.task('server:restart', getTask('restart-server'));
gulp.task('server:stop', getTask('stop-server'));
gulp.task('server:kill', getTask('kill-server'));
gulp.task('test:lint', getTask('test-lint', {
  src: srcLint,
  reporter: jsHintReporter
}));
gulp.task('pre-test:unit:server', getTask('pre-test-server-unit', {
  src: srcCoveredServerCode,
  coverage: coverageOptions,
  dist: 'tmp/test/'
}));
gulp.task('test:unit:server',
  getTask('test-server-unit', {
  src: srcServerUnitTests,
  jasmine: jasmineOptions,
  coverage: coverageOptions
}));
gulp.task('test:unit', getTask('test-unit', {
  configPath: karmaConfigPath,
  reporters: karmaReporters,
  singleRun: true,
  autoWatch: false
}));
gulp.task('test:unit:tdd', getTask('test-unit', { //restarts on changes
  configPath: karmaConfigPath,
  reporter: karmaReporters,
  singleRun: false,
  autoWatch: true
}));
gulp.task('test:api', getTask('test-api', {
  src: srcApiTests
}));
gulp.task('test:integration', getTask('test-integration', {
  tests: srcIntegrationTests
}));

// Runs entire test suite
gulp.task('test:all', function(done){
  plugins.gulpSequence(
    //'server:start',
    'test:lint',
    'test:unit:server',
    //'test:unit',
    //'test:api',
    //'test:integration',
    'server:stop')(done);
});

// Shortcut to run the entire test suite
gulp.task('test', ['test:all'], getTask('exit-process'));

// Restarts server on code changes
gulp.task('default', ['server:start'], function(){
  gulp.watch(srcServerWatch, ['server:restart']);
});

// Runs unit test suite
gulp.task('test:tdd', function(done){
  plugins.gulpSequence(
    'test:lint',
    'test:unit:server'
    //'test:unit',
  )(done);
});

// Restarts server on code changes
gulp.task('tdd', function(){
  gulp.watch(srcServerWatch, ['test:tdd']);
});
