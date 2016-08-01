var http = require('http'),
    express = require('express'),
    path = require('path');
var app = express();

app.set('port', 9000);
app.use( '/public', express.static( path.resolve( __dirname, 'public' )));
app.use( '/calypso', express.static( path.resolve( __dirname, 'calypso' )));

// Always serve the same HTML file for all requests
app.get('*', function(req, res, next) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

// create server
var server = http.createServer(app);
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
