var commonConfig = require('./common.conf')
  , os = require('os')
  , version
  , major
  , minor
  , polyfills = [{
    pattern: 'node_modules/document-register-element/build/document-register-element.max.js', // eslint-disable-line max-len
    watched: false
  }]
  , browsers = ['Firefox']

/* eslint-disable no-magic-numbers */
// if (process.platform === 'darwin') browsers.push('Safari');
if (process.platform === 'win32') {
  version = os.release().split('.')
  major = parseInt(version[0], 10)
  minor = parseInt(version[1], 10)
  if ((major === 6 && minor === 1) || major > 6) browsers.push('IE')
}
/* eslint-enable no-magic-numbers */

module.exports = function (config) {
  config.set({
    basePath: commonConfig.basePath,
    frameworks: commonConfig.frameworks,
    files: polyfills.concat(commonConfig.files),
    exclude: commonConfig.exclude,
    preprocessors: commonConfig.preprocessors,
    reporters: commonConfig.reporters,
    // web server port
    port: 9877,
    colors: commonConfig.colors,
    // level of logging
    // possible values:
    //   config.LOG_DISABLE
    //   config.LOG_ERROR
    //   config.LOG_WARN
    //   config.LOG_INFO
    //   config.LOG_DEBUG
    logLevel: config.LOG_ERROR,
    autoWatch: commonConfig.autoWatch,
    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: browsers,
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    concurrency: commonConfig.concurrency
  })
}
