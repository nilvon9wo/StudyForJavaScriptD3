function debug(message){
    "use strict";
    var log = getLog();
    var newItem = $('<pre/>').text(message);
    log.append(newItem);

    function getLog(logElement){
        var logElement = 'debug-log' ;
        var log = $('#' + logElement);
        if (log.length === 0) {
            log = $('<div id="' + logElement  + '"><h1>Debug Log</h1></div>');
        }
        log.appendTo(document.body);
        return log;
    }
}

