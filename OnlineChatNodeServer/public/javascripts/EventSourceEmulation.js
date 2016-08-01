window.EventSource = window.EventSource || function(url) {
        'use strict';
        var eventSource = this;
        var charsReceived = 0;
        var type = null;
        var data = '';
        var eventName = 'message';
        var lastEventId = '';
        var retryDelay = 1000;
        var aborted = false;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            switch (xhr.readyState) {
                case 3:
                    processData();
                    break;
                case 4:
                    reconnect();
                    break;
            }
        };
        connect();

        function connect() {
            charsReceived = 0;
            type = null;
            xhr.open('GET', url);
            xhr.setRequestHeader('Cache-Control', 'no-cache');
            if (lastEventId) {
                xhr.setRequestHeader('Last-Event-ID', lastEventId);
            }
            xhr.send();
        }

        function reconnect() {
            if (aborted || xhr.status >= 300) {
                return;
            }
            setTimeout(connect, retryDelay);
        }

        function processData() {
            if (!type) {
                type = xhr.getResponseHeader('Content-Type');
                if (type !== 'text/event-stream') {
                    aborted = true;
                    xhr.abort();
                    return;
                }
            }

            var chunk = xhr.responseText.substring(charsReceived);
            charsReceived = xhr.responseText.length;
            processDataLines(chunk.replace(/(\r\n|\r|\n)$/, '').split(/\r\n|\r|\n/).toArray());
        }

        function processDataLines(lines) {
            lines.forEach(function(line) {
                var position = line.indexOf(':');
                if (position !== 0) {
                    updateClassValues(line, position);

                    if (line === '') {
                        if (eventSource.onmessage && data !== '') {
                            if (data.charAt(data.length - 1) === '\n') {
                                data = data.substring(0, data.length - 1);
                            }
                            eventSource.onmessage({
                                type: eventName,
                                data: data,
                                origin: url
                            });
                        }
                        data = '';
                    }
                }
            });
        }

        function updateClassValues(line, position) {
            var name = '';
            var value = '';

            if (position > 0) {
                var property = splitProperties(line, position);
                name = property.name;
                value = property.value;
            } else {
                name = line;
            }

            switch (name) {
                case 'event':
                    eventName = value;
                    break;
                case 'data':
                    data += value + '\n';
                    break;
                case 'id':
                    lastEventId = value;
                    break;
                case 'retry':
                    retryDelay = parseInt(value) || 1000;
                    break;
                default:
                    break;
            }
        }

        function splitProperties(line, position) {
            var value = line.substring(position + 1);
            if (value.charAt(0) === '') {
                value = value.substring(1);
            }
            return {
                name: line.substring(0, position),
                value: value
            }
        };
    };



