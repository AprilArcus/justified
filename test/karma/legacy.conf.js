var commonConfig = require('./common.conf')
  , os = require('os')
  , version
  , major
  , minor
  , polyfills

/* eslint-disable no-magic-numbers */
if (process.platform === 'win32') {
  version = os.release().split('.')
  major = parseInt(version[0], 10)
  minor = parseInt(version[1], 10)
  if (major < 5 || (major === 5 && minor === 0)) {
    throw new Error(
      'Windows versions older than XP and IE versions older than 8 are' +
      'not supported.'
    )
  } else if (major === 5 && minor === 1) {
    console.log('Windows XP detected, configuring polyfills for IE 8')
    polyfills = [{
      pattern: 'test/karma/setTimeout.js',
      watched: false
    }, {
      pattern: 'node_modules/ie8/build/ie8.max.js',
      watched: false
    }, {
      pattern: 'node_modules/dom4/build/dom4.max.js',
      watched: false
    }, {
      pattern: 'node_modules/document-register-element/build/dre-ie8-upfront-fix.max.js', // eslint-disable-line max-len
      watched: false
    }, {
      pattern: 'node_modules/document-register-element/build/document-register-element.max.js', // eslint-disable-line max-len
      watched: false
    }, {
      pattern: 'node_modules/es5-shim/es5-shim.js',
      watched: false
    }, {
      pattern: 'node_modules/es5-shim/es5-sham.js',
      watched: false
    }, {
      pattern: 'node_modules/node-iterator-shim/dist/node-iterator-shim.js',
      watched: false
    },
    'http://localhost:3000/build/test/dom-node-iterator-shim.js'
    ]
  } else if (major === 6 && minor === 0) {
    console.log('Windows Vista detected, configuring polyfills for IE 9')
    polyfills = [{
      pattern: 'test/karma/setTimeout.js',
      watched: false
    }, {
      pattern: 'node_modules/document-register-element/build/document-register-element.max.js', // eslint-disable-line max-len
      watched: false
    }]
  } else {
    throw new Error(
      'Use Windows XP or Windows Vista to test legacy IE versions'
    )
  }
} else {
  throw new Error('Can only test legacy IE versions on Windows')
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
    port: 9878,
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
    browsers: ['IE'],
    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,
    concurrency: commonConfig.concurrency
  })
}
