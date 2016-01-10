module.exports = {

  basePath: '',

  frameworks: [
    'mocha',
    'expect',
    'sinon'
  ],

  files: [
    {
      pattern: './node_modules/babel-polyfill/dist/polyfill.min.js',
      watched: false
    },
    {
      pattern: './test/**/*.js',
      watched: true,
      included: false,
      served: false
    },
    './test/entry.js'
  ],

  preprocessors: { 'test/entry.js': ['webpack'] },

  webpack: {
    module: { loaders: require('./webpack.config').module.loaders }
  },

  webpackMiddleware: {
    stats: { colors: true }
  },

  reporters: ['spec'],

  port: 9876,

  colors: true,

  autoWatch: true,

  captureTimeout: 60000, // ms

  singleRun: false
};
