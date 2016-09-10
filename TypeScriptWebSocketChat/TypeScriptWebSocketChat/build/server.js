'use strict';
var WebSocket = require('ws');
var messageModel = require('./models/Message');
var port = process.env.PORT || 3000;
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ port: port });
server.on('connection', function (ws) {
    ws.on('message', function (message) {
        try {
            var userMessage = new messageModel.UserMessage(message);
            broadcast(JSON.stringify(userMessage));
        }
        catch (exception) {
            console.error(exception.message);
        }
    });
});
function broadcast(data) {
    server.clients.forEach(function (client) {
        client.send(data);
    });
}
;
console.info('Server is running on port', port);
