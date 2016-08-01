var stockHelper = {
    processTicker: function(eventSource, callback) {
        'use strict';
        var ticker = new EventSource(eventSource);
        ticker.onmessage = function(event) {
            var type = event.type;
            var data = event.data;
            callback(type, data, event, ticker);
        }
    }
};