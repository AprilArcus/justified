var path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './src/element.js',
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'test')
        ]
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'test')
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'justified.js'
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
};
