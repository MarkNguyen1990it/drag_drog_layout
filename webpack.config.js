var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractCSS = new ExtractTextPlugin('stylesheets/aaaa.css');

module.exports = {
    entry: {
        app: "./app/app.js"
    },
    output: {
        path: path.join(__dirname, "/public/js/"),
        filename: "[name].js"
    },
    module: {
        loaders: [
          {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract(
                  'style', // backup loader when not building .css file
                  'css!sass' // loaders to preprocess CSS
              )
          },
          {
            test: /.js?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
            }
         }
      ]
    },
    plugins: [
        new ExtractTextPlugin('[name].css'),
    ]

};
