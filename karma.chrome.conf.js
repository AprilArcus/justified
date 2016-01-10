var chromeConfig = require('./karma.common.conf');

module.exports = function (config) {
  // possible values:
  //   config.LOG_DISABLE
  //   config.LOG_ERROR
  //   config.LOG_WARN
  //   config.LOG_INFO
  //   config.LOG_DEBUG
  chromeConfig.logLevel = config.LOG_INFO;

  chromeConfig.files = [
    {
      pattern: './node_modules/dom4/build/dom4.max.js',
      watched: false
    }
  ].concat(chromeConfig.files);

  // Start these browsers, currently available:
  // - Chrome
  // - ChromeCanary
  // - Firefox
  // - Opera (install with `npm install karma-opera-launcher`)
  // - Safari (only Mac; install with `npm install karma-safari-launcher`)
  // - PhantomJS
  // - IE (only Windows; install with `npm install karma-ie-launcher`)
  chromeConfig.browsers = ['Chrome'];

  chromeConfig.singleRun = true;

  config.set(chromeConfig);
};
