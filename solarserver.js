'use strict';

const SUPPORTED_TYPE = {
  '.html': {
    'Content-Type': 'text/html; charset = UTF-8'
  },
  '.txt': {
    'Content-Type': 'text/plain; charset = UTF-8'
  },
  '.js': {
    'Content-Type': 'application/javascript; charset = UTF-8'
  },
  '.appcache': {
    'Content-Type': 'text/cache-manifest; charset = UTF-8',
    'Cache-Control': 'no-cache'
  },
  '.css': {
    'Content-Type': 'text/css; charset = UTF-8'
  },
  '.json': {
    'Content-Type': 'application/json; charset = UTF-8' 
  },
  '.gif': {
    'Content-Type': 'image/gif'
  }
}
const DEFAULT_TYPE = {'Content-Type': 'text/plain; charset = UTF-8'};

const HOME = './html/planets.html';

function servePage(request, response) {
  var filename = '.' + url.parse(request.url).pathname;
  
  if(filename === './') {
    filename = HOME;
  }

  var ext = path.extname(filename).toLowerCase();
  var header = SUPPORTED_TYPE[ext] || DEFAULT_TYPE;
  fs.readFile(filename, function(err,content) {
    if(err) {
      response.writeHead(404, {'Content-Type': 'text/plain; charset = UTF-8'});
      response.write(err.message);
      response.write('-Page is not found');
      response.end();
    } else {
      response.writeHead( 200, header); 
      response.write(content); 
      response.end();
    }
  });
}


var url = require('url');
var path = require('path');
var fs = require('fs');
var http = require('http');

var server = http.createServer(servePage);
server.listen(8080);
console.log('server running');

