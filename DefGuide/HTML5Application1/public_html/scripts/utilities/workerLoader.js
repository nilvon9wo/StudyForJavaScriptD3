onmessage = function(event) {
    'use strict';
    var message = event.data;
    console.info('URL contents: ' + message);
};

onerror = function(event) {
    'use strict';
    console.error('Error at ' + event.filename + ':' + event.lineno + ': ' + event.message);
};