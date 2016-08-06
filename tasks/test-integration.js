'use strict';

// Using casper with gulp and windows is not intuitive. Change this at your own
// risk.
module.exports = function(gulp, plugins, options) {
  return function (done) {
    var tests = options.tests;
    var casperChild;

    function onError(code) {
      done(code.err.msg);
      // Gulp doesn't handle the error properly so clean up properly
      plugins.gutil.log('Stopping server');
      plugins.server.kill(function () {
        process.exit(code);
      });
    }

    // Spawns a process on windows
    function windowsSpawn(executable, args, options) {
      return plugins.spawn('cmd.exe', ['/c', executable].concat(args), options);
    }

    if (process.platform === 'win32') {
      // Don't inherit stdio here since it causes problems
      casperChild = windowsSpawn('casperjs', ['test'].concat(tests));
      // Must handle data here for the tests to execute within the task
      // Handle this only for windows
      casperChild.stdout.on('data', function (data) {
        plugins.gutil.log('CasperJS:', data.toString().slice(0, -1));//remove \n
      });
    } else {
      casperChild = plugins.spawn('casperjs', ['test'].concat(tests),
        {stdio: 'inherit'});
    }

    casperChild.on('close', function (code) {
      if (code) {
        // If there is an error, format the error object for gulp
        // Gulp depends on the this structure
        var err = {
          err: {
            msg: 'Integration test failure'
          },
          toString: function () {
            return err.err.msg;
          },
          showStack: false
        };
        onError(err);
      } else {
        // Everything is good
        done();
      }
    });
  };
};
