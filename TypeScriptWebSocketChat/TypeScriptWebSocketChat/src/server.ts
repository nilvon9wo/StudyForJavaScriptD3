/// <reference path='../declarations/node.d.ts' />
/// <reference path='../declarations/ws.d.ts' />
'use strict';
 
 import WebSocket = require('ws');
 import messageModel = require('./models/Message');
 
 var port: number = process.env.PORT || 3000;
 var WebSocketServer = WebSocket.Server;
 var server = new WebSocketServer({port: port});
 
 server.on('connection', ws => {
	 ws.on('message', message => {
		 try {
			 var userMessage: messageModel.UserMessage = new messageModel.UserMessage(message);
			 broadcast(JSON.stringify(userMessage));
		 } catch (exception) {
			 console.error(exception.message);
		 }
	 });
 });
 
 function broadcast(data: string): void {
	 server.clients.forEach(client => {
		 client.send(data);
	 });
 };
 
 console.info('Server is running on port', port);