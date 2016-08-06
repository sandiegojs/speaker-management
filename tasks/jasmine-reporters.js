'use strict';

var reporters = require('jasmine-reporters');

var terminalReporter = new reporters.TerminalReporter({
  verbosity: 3,
  color: true,
  showStack: true
});

module.exports = {
  terminal: terminalReporter
};
