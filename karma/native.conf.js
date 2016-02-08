var commonConfig = require('./common.conf')

module.exports = function (config) {
  config.set({
    basePath: commonConfig.basePath,
    frameworks: commonConfig.frameworks,
    files: commonConfig.files,
    exclude: commonConfig.exclude,
    preprocessors: commonConfig.preprocessors,
    reporters: commonConfig.reporters,
    // web server port
    port: 9876,
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
    browsers: ['Chrome'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    concurrency: commonConfig.concurrency
  })
}
