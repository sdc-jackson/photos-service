const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './server/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'photos-service-ssr.js',
    publicPath: '/'
  },
  target: 'node',
  externals: nodeExternals(),
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `'production'`
      }
    }),
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)/,
        loader: 'babel-loader'
      }
    ]
  }
};