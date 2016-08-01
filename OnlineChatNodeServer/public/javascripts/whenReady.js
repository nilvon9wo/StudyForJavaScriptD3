var whenReady = (function () {
    var funcs = [];
    var ready = false;

    function isDocumentComplete(event){
    return event.type === 'readystatechange' && 
            document.readyState !== 'complete';
    }

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
    
    if (document.addEventListener){
        document.addEventListener('DOMContentLoaded', handler, false);
        document.addEventListener('readystatechange', handler, false);
        window.addEventListener('load', handler, false);
    } else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', handler);
        window.attachEvent('onload', handler);
    }
    
    return function whenReady(func) {
        if (ready) {
            func.call(document);
        } else {
            funcs.push(func);
        }
    };
}());