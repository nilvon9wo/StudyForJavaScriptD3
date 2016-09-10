function createSocket(data){
  var socket = new WebSocket('ws://localhost:3000');

  socket.onmessage = function(message){
    console.log('Connection ' + data.number, message.data);
  }
  
  return socket;
}

var sockets = [];
for (var i=1; i <= 3; i++){
  sockets[i] = createSocket({
    number: i
  });
}

console.log('$$$$ sockets', sockets);

sockets[1].onopen = function(event){
  console.log('$$$$ event', event);
  
  sockets[1].send(JSON.stringify({
    name: 'Bob',
    message: 'Hello'
  }));
}

