'use strict';

var loopback = require('loopback');

var app = module.exports = loopback();

app.on('start', function onStart(){
  app.start();
});

app.on('started', function onStarted(){
  var baseUrl = getUrl(app);
  console.log('Web server listening at: %s', baseUrl);
  console.log('Get server status at: %s%s', baseUrl, '/status');
  if (app.get('loopback-component-explorer')) {
    var explorerPath = app.get('loopback-component-explorer').mountPath;
    console.log('Browse the REST API at %s%s', baseUrl, explorerPath);
  }
});

function getUrl(app){
  if (app.get('url')) {
    return app.get('url').replace(/\/$/, '');
  } else {
    return app.get('host') + ':' + app.get('port');
  }
}

/**
 * Allows another module to set boot options before configuring models,
 * datasources, middleware, and plugins and starting the server
 *
 * @param options Options used during the boot process
 * @param callback
 */
app.boot = function bootServer(options){
  var boot = require('loopback-boot');

  // Pass boot options to app to allow it to set additional app properties
  // as necessary
  app.set('boot', getOptions(options));

  boot(app, __dirname);
};

/**
 * Handles command line arguments and environment variables used to start
 * the app server
 *
 * @param options Options used override defaults
 */
function getOptions(options){
  // TODO: move to argv module that provides documentation
  var argv = require('minimist')(process.argv.slice(2));
  var _ = require('underscore');

  if (options === undefined) options = {};

  // Handle common runtime overrides
  var cliOptions = {
    port: argv.p,
    appName: argv.n,
    collectStats: argv['collect-stats'],
    maxListeners: argv['max-listeners']
  };

  // Handle environment variables
  var environmentOptions = {
    port: process.env.PORT,
    appName: process.env.APP_NAME,
    collectStats: process.env.COLLECT_STATS,
    maxListeners: process.env.MAX_LISTENERS
  };

  // Make sure necessary options are in place
  var defaultOptions = {
    port: 3000,
    collectStats: false
  };

  _.defaults(options, cliOptions, environmentOptions, defaultOptions);

  // Make sure types are valid
  options.port = Number(options.port);

  return options;
}

/***
 * Starts HTTP server
 */
app.start = function startServer(){
  return app.listen(function(){
    app.emit('started');
  });
};


// start the server if `$ node server.js`
// otherwise, the calling module should call app.boot()
if (require.main === module) {
  app.boot();
  app.emit('start');
}
