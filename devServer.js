var express = require('express')
  , webpack = require('webpack')
  , webpackDevMiddleware = require('webpack-dev-middleware')
  , config = require('./webpack.config')
  , port = 3000
  , app = express();

app.use(express.static(__dirname));

app.use(webpackDevMiddleware(webpack(config), {
  noInfo: true,
  publicPath: '/build/'
}));

app.listen(port, null, function (err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
