var httpPort = process.env.HTTP_PORT || 8380;
var webSocketPort = process.env.WEBSOCKET_PORT || 3000;

var app = require('express')();
var fs = require('fs');
var http = require('http').Server(app);
var WebSocket = require('ws');

app.listen(httpPort);
console.info('Http Server is running on port', httpPort);

var WebSocketServer = WebSocket.Server;
var webSocketServer = new WebSocketServer({port: webSocketPort});
console.info('Web Socket Server is running on port', webSocketPort);

app.get('/', function (request, response) {
    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    transcribeFile('public/index.html');
    transcribeFile('public/style/websockets.css', 'style');
    [
        'public/scripts/lib/MediusLog.js',
        'public/scripts/lib/MediusEvent.js',
        'public/scripts/lib/MediusElement.js',
        'public/scripts/lib/ObjectExtensions.js',
        'public/scripts/app.js'
    ].forEach(function (script) {
        transcribeFile(script, 'script');
    });
    response.end();

    function transcribeFile(path, tag) {
        if (tag) {
            response.write('<' + tag + '>');
        }
        response.write(require('fs').readFileSync(path));
        if (tag) {
            response.write('</' + tag + '>');
        }
    }
});

webSocketServer.on('connection', function (socket) {
    socket.emit('announcements', {message: 'A new user has joined!'});
    console.info('a user connected with id %s', socket.id);

    socket.on('disconnect', function () {
        console.info('user disconnected');
    });

    socket.on('message', function (message) {
        try {
            broadcast(JSON.stringify(message));
        } catch (exception) {
            console.error(exception.message);
        }
    });

    function broadcast(message) {
        webSocketServer.clients.forEach(function (client) {
            client.send(message);
        });
    }
});
