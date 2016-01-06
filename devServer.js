const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');

const app = express();

app.use(express.static(__dirname));

app.use(webpackDevMiddleware(webpack(config), {
  noInfo: true,
  publicPath: '/build/'
}));

app.listen(3000, null, err => {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:3000');
});
