'use strict';

var path = require('path');
var projectRoot = path.join(__dirname, '../../');

/**
 * Load configured modules
 * @param app
 * @param callback
 */
module.exports = function loadPlugins(app, callback) {
  var log = require('debug')('boot:plugin-loader');
  log('load plugins');
  // Architect can throw errors that are difficult to catch
  // Handle them here and remove this listener when the system is ready
  process.on('uncaughtException', callback);

  try {

    var architect = require('architect');
    var pluginInfo = getPluginInfo(app);
    var resolvedPlugins;

    app.set('plugins', pluginInfo.plugins);

    // Resolve the configured plugins
    resolvedPlugins = architect.resolveConfig(
      app.settings.plugins, projectRoot);

    // Get services to inject into the app
    resolvedPlugins.push(getCoreServicesPlugin(app));

    // Load the plugins
    var system = architect.createApp(resolvedPlugins);

    // Handle system generation
    setUpSystemListeners(system, app, callback);

  } catch (err) {
    callback(err);
  }
};

function getPluginInfo(app){
  var defaultPath = path.join(projectRoot, './plugins');
  var configuredPath = app.get('pluginConfigPath');
  var pluginConfigPath = defaultPath;

  if (configuredPath !== undefined) {
    pluginConfigPath = configuredPath;
  }

  try {
    // Try to get the plugin configuration from the plugins directory
    return require(pluginConfigPath);
  } catch (err) {
    // assume no plugins available
    return [];
  }
}

// TODO: Modify test
function getCoreServicesPlugin(app){
  // Inject core app server services so they are available to the plugins
  var provides = ['app', 'Router', 'staticServer'];

  addConfigureRoutes(app.loopback.Router);
  app.loopback.static = enhanceStaticServer(app.loopback.static, app);

  var services = {
    app: app,
    Router: app.loopback.Router,
    staticServer: app.loopback.static
  };

  var io = {
    on: function(){}
  };
  // Inject socket server as a service
  if (app.get('io')) {
    services.io = app.get('io');
  } else {
    services.io = io;
  }
  provides.push('io');

  return {
    consumes: [],
    provides: provides,
    setup: function(options, imports, register){
      register(null, services);
    }
  };
}

function setUpSystemListeners(system, app, cb){
  // Handle when a new service is registered
  //system.on('service', function(service){
  //console.log(service);
  //});

  // Handle any errors
  system.on('error', function(err){
    console.error('problem creating the app modules');
    console.error(err);
    return cb(err);
  });

  // Handle when the plugins are completely ready
  system.on('ready', function(sys){
    process.removeListener('uncaughtException',
      cb);
    // Put a reference to the services to make it easier to get to from
    // code that was not bundled as a plugin
    app.services = sys.services;
    app.emit('plugins ready');
    return cb(null, sys);
  });
}

// TODO: write test
function addConfigureRoutes(Router){

  // Add method
  Router.configureRoutes =
    function configureRoutes(dirname, options, imports){
      var log;
      try {
        log = imports.log;
      } catch (err) {
        log = function(){
          return {error: function(){}};
        };
      }

      var router = this;

      function configureRoute(route){
        var action = '';
        if (route.action) {
          action = '.' + route.action;
        }
        log('>>> handle %s with %s%s', route.route, route.controller, action);
        setRoute.call(router, dirname, route, imports);
      }

      if (Array.isArray(options)){
        options.forEach(configureRoute);
      } else {
        log.error('configureRoutes requires an array of routes');
        console.error('configureRoutes requires an array of routes');
        // TODO: emit error to system
      }
    };

  return Router;
}

function setRoute(dirname, route, imports){
  var router = this; //jshint ignore:line
  try {
    var controllerPath = path.join(dirname, route.controller);
    var controller = require(controllerPath);
    if (route.import || route.imports){
      var finalImports = Object.assign({}, imports, route.imports);
      controller = controller(finalImports);
    }
    if (route.action){
      router[route.method](route.route, controller[route.action]);
    } else {
      router[route.method](route.route, controller);
    }
  } catch(err) {
    console.error('could not set up route %s', route.route);
  }
}

function enhanceStaticServer(staticServer, app){

  staticServer.mount = function mountStaticRouter(mountPoint, publicDir){
    if (publicDir) {
      app.use(mountPoint, staticServer(publicDir));
    }
  };

  staticServer.configureRoutes =
    function configureStaticRoutes(dirname, options){
      var staticServer = this;
      options.forEach(function setStaticRoute(dir){
        var mountTo = Object.keys(dir)[0];
        staticServer.mount(mountTo, path.join(dirname, dir[mountTo]));
      });
    };

  return staticServer;
}


