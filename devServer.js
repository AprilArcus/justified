import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import config from './webpack.config';

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
