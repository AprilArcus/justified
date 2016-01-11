var express = require('express')
  , webpack = require('webpack')
  , webpackDevMiddleware = require('webpack-dev-middleware')
  , config = require('./webpack.config')
  , port = 3000
  , devServer = express();

devServer.use(express.static(__dirname));

devServer.use(webpackDevMiddleware(webpack(config), {
  noInfo: true,
  publicPath: '/build/'
}));

module.exports = devServer.listen(port, null, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
