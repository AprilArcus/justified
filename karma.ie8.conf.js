var ie8Config = require('./karma.common.conf');

module.exports = function (config) {
  // possible values:
  //   config.LOG_DISABLE
  //   config.LOG_ERROR
  //   config.LOG_WARN
  //   config.LOG_INFO
  //   config.LOG_DEBUG
  ie8Config.logLevel = config.LOG_INFO;

  ie8Config.files = [
    {
      pattern:'./setTimeout.js',
      watched: false
    },
    {
      pattern:'./node_modules/ie8/build/ie8.max.js',
      watched: false
    },
    {
      pattern:'./node_modules/dom4/build/dom4.max.js',
      watched: false
    },
    {
      pattern:'./node_modules/document-register-element/build/dre-ie8-upfront-fix.max.js', // eslint-disable-line max-len
      watched: false
    },
    {
      pattern: './node_modules/document-register-element/build/document-register-element.max.js', // eslint-disable-line max-len
      watched: false
    },
    {
      pattern:'./node_modules/es5-shim/es5-shim.js',
      watched: false
    },
    {
      pattern:'./node_modules/es5-shim/es5-sham.js',
      watched: false
    }
  ].concat(ie8Config.files);

  // Start these browsers, currently available:
  // - Chrome
  // - ChromeCanary
  // - Firefox
  // - Opera (install with `npm install karma-opera-launcher`)
  // - Safari (only Mac; install with `npm install karma-safari-launcher`)
  // - PhantomJS
  // - IE (only Windows; install with `npm install karma-ie-launcher`)
  ie8Config.browsers = ['IE8'];

  ie8Config.customLaunchers = {
    IE8: {
      base: 'IE',
      'x-ua-compatible': 'IE=EmulateIE8'
    }
  };

  ie8Config.singleRun = true;

  config.set(ie8Config);
};
