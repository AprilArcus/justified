var genericConfig = require('./karma.common.conf');

module.exports = function (config) {
  // possible values:
  //   config.LOG_DISABLE
  //   config.LOG_ERROR
  //   config.LOG_WARN
  //   config.LOG_INFO
  //   config.LOG_DEBUG
  genericConfig.logLevel = config.LOG_INFO;

  genericConfig.files = [
    {
      pattern: './node_modules/dom4/build/dom4.max.js',
      watched: false
    },
    {
      pattern: './node_modules/document-register-element/build/document-register-element.max.js', // eslint-disable-line max-len
      watched: false
    }
  ].concat(genericConfig.files);

  // Start these browsers, currently available:
  // - Chrome
  // - ChromeCanary
  // - Firefox
  // - Opera (install with `npm install karma-opera-launcher`)
  // - Safari (only Mac; install with `npm install karma-safari-launcher`)
  // - PhantomJS
  // - IE (only Windows; install with `npm install karma-ie-launcher`)
  genericConfig.browsers = ['Firefox'];
  if (process.platform === 'darwin') genericConfig.browsers.push('Safari');
  if (process.platform === 'win32') genericConfig.browsers.push('IE');

  genericConfig.singleRun = true;

  config.set(genericConfig);
};
