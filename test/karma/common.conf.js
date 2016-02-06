module.exports = {

  // base path that will be used to resolve all patterns
  // (eg. files, exclude)
  basePath: '../..',

  // frameworks to use
  // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
  frameworks: [
    'mocha',
    'sinon',
    'sinon-expect'
  ],

  // list of files / patterns to load in the browser
  files: [
    {
      pattern: 'node_modules/babel-polyfill/dist/polyfill.js',
      watched: false
    },
    'http://localhost:3000/build/test/karma.js'
  ],

  // list of files to exclude
  exclude: [],

  // preprocess matching files before serving them to the browser
  // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
  preprocessors: {
    'http://localhost:3000/build/test.js': ['sourcemap']
  },

  // test results reporter to use
  // possible values: 'dots', 'progress'
  // available reporters: https://npmjs.org/browse/keyword/karma-reporter
  reporters: ['spec'],

  // enable / disable colors in the output (reporters and logs)
  colors: true,

  // enable / disable watching file and executing tests whenever any
  // file changes
  autoWatch: true,

  // Concurrency level
  // how many browser should be started simultaneous
  concurrency: Infinity
}
