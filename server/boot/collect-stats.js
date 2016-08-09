'use strict'
module.exports = function collectStats(app) {
  const log = require('debug')('boot:attach-boot-options')

  if (app.settings.collectStats) {
    log('collect stats')
    // To collect the information, start the app with:
    // slc run --metrics=statsd:///my-app.my-host.%w
    // Use datadoghq.com for example
    // See https://docs.strongloop.com/display/SLC/Viewing+metrics+with+DataDog
    require('strong-agent').use(
      require('strong-agent-statsd')()
    )
  }
}
