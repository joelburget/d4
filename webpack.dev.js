var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /(index|md)\.js$/,
        loaders: ['react-hot', 'babel']
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    module: 'empty',
  }
};
