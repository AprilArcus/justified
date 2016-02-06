var path = require('path')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    // justified: './src/element.js',
    'test/karma': './test/karma/entry.js',
    'test/dom-node-iterator-shim': './test/karma/dom-node-iterator-shim.js'
  },
  module: {
    preLoaders: [
      // {
      //   test: /\.js$/,
      //   loader: 'eslint',
      //   exclude: path.resolve(__dirname, 'node_modules')
      // }
    ],
    loaders: [
      {
        test: /\.js$/,
        loaders: ['es3ify', 'babel'],
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ],
    postLoaders: [
      {
        test: /linebreaker\.js$/,
        loader: 'transform?brfs',
        // TODO: this should be a regex
        include: path.resolve(__dirname, 'node_modules', 'linebreak', 'src')
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  plugins: [
  ],
  eslint: {
    fix: false,
    formatter: require('eslint/lib/formatters/stylish'),
    emitError: true,
    failOnError: true,
    emitWarning: true,
    failOnWarning: false,
    quiet: false
  }
}
