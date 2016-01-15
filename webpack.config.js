var path = require('path')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: {
    justified: './src/element.js',
    'test/karma': './test/karma/entry.js',
    'test/react': './test/react/entry.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: path.resolve(__dirname, 'node_modules')
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
