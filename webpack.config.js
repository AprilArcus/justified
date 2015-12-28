var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/element.js',
  module: {
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
    new webpack.NoErrorsPlugin()
  ]
};
