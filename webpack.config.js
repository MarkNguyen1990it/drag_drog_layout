var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './app/app.js',
  output: { path: __dirname + '/public/js/', filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract(
              'style', // backup loader when not building .css file
              'css!sass' // loaders to preprocess CSS
          )
      }
    ]
  },
  plugins: [
        new ExtractTextPlugin("test.css")
  ]
};
