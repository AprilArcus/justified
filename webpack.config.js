var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/element.js',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: path.resolve(__dirname, 'src')
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.resolve(__dirname, 'src')
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'justified.js'
  },
  plugins: [
    // new webpack.NoErrorsPlugin()
  ],
  eslint: {
    configFile: 'src/.eslintrc',
    fix: false,
    formatter: require("eslint/lib/formatters/stylish"),
    emitError: true,
    failOnError: true,
    emitWarning: true,
    failOnWarning: false,
    quiet: false,
  }
};
