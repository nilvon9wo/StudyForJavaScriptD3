whenReady(function(){
    'use strict';
    var nickname = prompt('Enter your nickname');
    var input = document.getElementById('input');
    input.focus();

    var chat = new EventSource('/chat');
    chat.onmessage = function(event) {
        var message = event.data;
        var node = document.createTextNode(message);
        var div = document.createElement('div');
        div.appendChild(node);
        document.body.insertBefore(div, input);
        input.scrollIntoView();
    };

    input.onchange = function(){
        var message = nickname + ': ' + input.value;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/chat');
        xhr.setRequestHeader('Content-Type', 'text/plain; charset=UTF-8');
        xhr.send(message);
        input.value = '';
    }
});