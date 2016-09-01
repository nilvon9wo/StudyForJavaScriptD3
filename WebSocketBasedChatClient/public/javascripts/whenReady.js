var whenReady = (function() {
    var funcs = [];
    var ready = false;

    Event.add(document, 'DOMContentLoaded', handler);
    Event.add(document, 'readystatechange', handler);
    Event.add(window, 'load', handler);

    return function whenReady(func) {
        if (ready) {
            func.call(document);
        } else {
            funcs.push(func);
        }
    };

    function isDocumentComplete(event) {
        return event.type === 'readystatechange' &&
            document.readyState !== 'complete';
    }

    function handler(event) {
        if (ready || isDocumentComplete(event)) {
            return;
        }

        funcs.forEach(function(func){
            'use strict';
            func.call(document);
        });

        funcs = null;
        ready = true;
    }
}());