var http = require('http');
var clientUi = require('fs').readFileSync('../public/chatclient.html');
var emulation = require('fs').readFileSync('../public/javascripts/EventSourceEmulation.js');
var whenReady = require('fs').readFileSync('../public/javascripts/whenReady.js');
var clientApp = require('fs').readFileSync('../public/javascripts/onlineChat.js');
var style = require('fs').readFileSync('../public/stylesheets/onlineChat.css');

var clients = [];
setInterval(function() {
    'use strict';
    clients.forEach(function(client) {
        client.write(':ping\n');
    }, 20000);
});

var server = new http.Server();
server.on('request', function(request, response) {
    'use strict';
    var url = require('url').parse(request.url);
    if (url.pathname === '/') {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('<script>' + emulation + '</script>');
        response.write('<script>' + whenReady + '</script>');
        response.write('<script>' + clientApp + '</script>');
        response.write('<style>' + style + '</style>');
        response.write(clientUi);
        response.end();
        return;
    } else if (url.pathname !== '/chat') {
        response.writeHead(404);
        response.end();
        return;
    }

    if (request.method === 'POST') {
        request.setEncoding('utf8');
        var body = '';
        request.on('data', function(chunk) {
            body += chunk;
        });

        request.on('end', function() {
            response.writeHead(200);
            response.end();
            var message = 'data: ' + body.replace('\n', '\ndata: ') + '\r\n\r\n';
            clients.forEach(function(client) {
                client.write(message);
            });
        });
    } else {
        response.writeHead(200, {'Content-Type': 'text/event-stream'});
        response.write('data: Connected\n\n');

        request.connection.on('end', function(){
           clients.splice(clients.indexOf(response), 1);
            response.end();
        });

        clients.push(response);
    }
});

server.listen(8000);
