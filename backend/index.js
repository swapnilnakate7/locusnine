var app = require('./server');
var http = require('http');
const PORT =8080;
var server =http.createServer(app);
server.listen(PORT);