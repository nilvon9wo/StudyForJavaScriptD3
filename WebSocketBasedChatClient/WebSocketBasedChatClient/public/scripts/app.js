/* global MediusEvent, MediusElement */


MediusEvent.whenReady(function () {
    var nickname = prompt('Enter your nickname');
    var getElementById = document.getElementById.bind(document);

    var socket = createSocket();
    addSubmissionHandler(socket);
    addMessageListener(socket);
    addCloseHandler(socket);

    function createSocket() {
        var socket = new WebSocket('ws://localhost:3000/');
        MediusEvent.add(socket, 'open', function (event) {
            updatedStatus({
                innerHTML: 'Connected to: ' + event.currentTarget.url,
                className: 'open'
            });
        });
        return socket;
    }

    function updatedStatus(config) {
        var socketStatus = getElementById('status');
        socketStatus.innerHTML = config.innerHTML;
        socketStatus.className = config.className;
    }


    function addSubmissionHandler(socket) {
        var form = getElementById('message-form');

        MediusEvent.add(form, 'submit', function (event) {
            event.preventDefault();

            var messageField = getElementById('message');
            var message = {
                nickname: nickname,
                message: messageField.value
            };
            socket.send(JSON.stringify(message));
            displayMessage([ nickname + ': ', message.message]);

            messageField.value = '';
            return false;
        });
    }

    function displayMessage(innerContent) {
        var messageList = getElementById('messages');
        messageList.innerHTML += MediusElement.create({
            tag: 'li',
            attributes: {class: 'sent'},
            innerContent: MediusElement.create({
                tag: 'span',
                innerContent: innerContent
            })
        });
    }

    function addMessageListener(socket) {
        var messageList = getElementById('messages');
        MediusEvent.add(socket, 'message', function (event) {
            var message = event.data;
            message = JSON.parse(message);
            if (message.nickname !== nickname) {
                displayMessage([ message.nickname + ': ', message.message]);
            }
        });
    }

    function addCloseHandler(socket) {
        MediusEvent.add(socket, 'close', function (event) {
            updatedStatus({
                innerHTML: 'Disconnected from WebSocket',
                className: 'closed'
            });
        });

        var closeButton = getElementById('close');
        MediusEvent.addClick(closeButton, function (event) {
            event.preventDefault();
            socket.close();
            return false;
        });
    }
});
