var http = require('http'),
    express = require('express'),
    path = require('path');
var app = express();
var multer  = require('multer');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');


var express = require('express');
var multer  = require('multer');

var proxy = require('proxy-middleware');
var url = require('url');
app.use('/public/js', proxy(url.parse('http://localhost:8081/public/js')));
var server = new WebpackDevServer(webpack(config), {
    contentBase: __dirname,
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: "/public/js/",
    stats: { colors: true }
});


// returns a Compiler instance

app.use( '/public', express.static( path.resolve( __dirname, 'public' )));
app.use( '/calypso', express.static( path.resolve( __dirname, 'calypso' )));

// Always serve the same HTML file for all requests
app.get('*', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

var upload=multer({ dest: './app/components/cms-dashboard/'});
app.post('/upload',upload.single("myfile"), function(req, res){
console.log("./"+req.file.path);
var extract = require('extract-zip');
var zipfile="./"+req.file.path;
var fs=require('fs');
extract(zipfile, { dir: './app/components/cms-dashboard/' }, function (err) {
   fs.unlink(zipfile);
})
});

// create server
server.listen(8081, "localhost", function() {

});
app.listen(8080);
