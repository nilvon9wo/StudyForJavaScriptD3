onmessage = function(event) {
    'use strict';
    var urls = event.data;
    var contents = [];

    for(var index = 0; index < urls.length; index++) {
        var url = urls[index];
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        if (xhr.status !== 200) {
            throw Error (xhr.status + ' ' + xhr.statusText + ': ' + url);
        }
        contents.push(xhr.responseText);
    }

    postMessage(contents);
};

