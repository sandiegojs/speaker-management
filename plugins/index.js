'use strict';

var path = require('path');

module.exports = {
  plugins: [
    {
      packagePath: 'architect-debug-logger',
      transports: {
        console: {
          colorize: true,
          level: 'debug'
        }
        //file: {
        //  filename: 'logs/errors.log',
        //  level: 'error'
        //},
        //dailyFileRotate: {
        //  filename: 'logs/app.log',
        //  level: 'warn'
        //}
      }
    }
  ]
};
