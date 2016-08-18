
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractCSS = new ExtractTextPlugin('stylesheets/aaaa.css');
var webpackConfig = {
   entry: [
           './app/components/loadmultiple.js',
           'webpack/hot/dev-server',
           'webpack-dev-server/client?http://localhost:8081'
       ],
    output: {
        path: path.join(__dirname, "/public/js/"),
        filename: "loadmultiple.js",
        publicPath: "http://localhost:8081/public/js/"
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
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name].css')
    ]



};



module.exports = webpackConfig;