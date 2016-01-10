var ie9Config = require('./karma.common.conf');

module.exports = function (config) {
  // possible values:
  //   config.LOG_DISABLE
  //   config.LOG_ERROR
  //   config.LOG_WARN
  //   config.LOG_INFO
  //   config.LOG_DEBUG
  ie9Config.logLevel = config.LOG_INFO;

  ie9Config.files = [
    {
      pattern: './setTimeout.js',
      watched: false
    },
    {
      pattern: './node_modules/dom4/build/dom4.max.js',
      watched: false
    },
    {
      pattern: './node_modules/document-register-element/build/document-register-element.max.js', // eslint-disable-line max-len
      watched: false
    }
  ].concat(ie9Config.files);

  // Start these browsers, currently available:
  // - Chrome
  // - ChromeCanary
  // - Firefox
  // - Opera (install with `npm install karma-opera-launcher`)
  // - Safari (only Mac; install with `npm install karma-safari-launcher`)
  // - PhantomJS
  // - IE (only Windows; install with `npm install karma-ie-launcher`)
  ie9Config.browsers = ['IE9'];

  ie9Config.customLaunchers = {
    IE9: {
      base: 'IE',
      'x-ua-compatible': 'IE=EmulateIE9'
    }
  };

  ie9Config.singleRun = true;

  config.set(ie9Config);
};
