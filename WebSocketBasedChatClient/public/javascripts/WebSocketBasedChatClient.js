whenReady(function(){
    'use strict';
    var nickname = prompt('Enter your nickname');
    var input = document.getElementById('input');
    input.focus();

    var socket = new WebSocket('ws://' + location.host + '/');
    Event.add(socket, 'message', function(event){
        var message = event.data;
        var node = document.createTextNode(message);
        var div = document.createElement('div');
        div = document.createElement('div');
    });
});