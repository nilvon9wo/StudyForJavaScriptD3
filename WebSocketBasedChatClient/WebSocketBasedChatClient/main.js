var http = require('http');
var clientUi = require('fs').readFileSync('public/index.html');

var httpServer = new http.Server();
httpServer.on('request', function (request, response) {
    if (request.url === '/') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(clientUi);
        response.end();
    } else {
        response.writeHead(404);
        response.end();
    }
});

var WebSocketServer = require('ws').Server;
var wsServer = new WebSocketServer({port: 8000});
wsServer.on('connection', function (socket) {
    socket.on('message', function (message) {
        wsServer.broadcast(message);
    });

    socket.send('Welcome to the chat room.');
});
