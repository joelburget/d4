var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: './index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: path.join(__dirname, 'node_modules')
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  }
};
