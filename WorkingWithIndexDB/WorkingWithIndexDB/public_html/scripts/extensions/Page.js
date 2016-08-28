/* global Event */

var Page = Page || {};
Page.onReady = Page.onReady || (function () {
    var funcs = [];
    var ready = false;

    Event.add(document, 'DOMContentLoaded', handler);
    Event.add(document, 'readystatechange', handler);
    Event.add(window, 'load', handler);

    return whenReady;

    function handler(event) {
        if (ready || isDocumentComplete(event)) {
            return;
        }

        for (var index = 0; index < funcs.length; index++) {
            funcs[index].call(document);
        }

        ready = true;
        funcs = null;
    }

    function isDocumentComplete(event) {
        return event.type === 'readystatechange' &&
                document.readyState !== 'complete';
    }

    function whenReady(func) {
        if (ready) {
            func.call(document);
        } else {
            funcs.push(func);
        }
    };
}());