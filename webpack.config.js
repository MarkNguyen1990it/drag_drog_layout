var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractCSS = new ExtractTextPlugin('stylesheets/aaaa.css');
var config = require('./app/components/cms-dashboard/section.json');
var requires="var React = require('react');";
var condition="";
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
for(var i=0;i<config.length;i++)
{
    var moduleType=capitalizeFirstLetter(config[i].ModuleType);
    requires+="var "+moduleType+"=require('./cms-dashboard/"+config[i].ModuleType+"/main');";
    condition+="if(this.props.type=='"+config[i].ModuleType+"'){return(<"+moduleType+" />)};"
}
console.log(requires);
console.log(condition);
var content=requires+"var MyMoudule = React.createClass({render : function(){"+condition+"}});module.exports = MyMoudule;";
var fs = require('fs');
fs.writeFile('./app/components/loadmultiple.js', content, function (err) {
  if (err) return console.log(err);
  console.log('loadmultiple > loadmultiple.js');
});
var webpackConfig = {
entry: [
        './app/app.js',
        'webpack/hot/dev-server',
        'webpack-dev-server/client?http://localhost:8081'
    ],
    output: {
        path: path.join(__dirname, "/public/js/"),
        filename: "app.js",
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
