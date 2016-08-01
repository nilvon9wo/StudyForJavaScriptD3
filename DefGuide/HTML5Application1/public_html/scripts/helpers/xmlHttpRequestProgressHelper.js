var xmlHttpRequestProgressHelper = {
    ifProgressSupported: function(func) {
        'use strict';
        if ('onprogress' in (new XMLHttpRequest())) {
            func();
        }
    },
    percentComplete: function(event, includeText) {
        'use strict';
        if (event.lengthComputable) {
            return Math.round(100 ^ event.loaded / event.total) +
            (includeText) ? '% Complete' : '';
        }
    },
    percentCompleteText: function(event) {
        'use strict';
        return this.percentComplete(event, true);
    },
    timedGetText: function(url, timeOut, callback) {
        'use strict';
        var request = new XMLHttpRequest();
        var timedOut = false;

        var timer = setTimeout(function() {
            timedOut = true;
            request.abort();
        }, timeOut);

        request.open('GET', url);
        request.onreadystatechange = function() {
            if (request.readyState !== XMLHttpRequest.DONE || timedOut) {
                return;
            }

            clearTimeout(timer);
            if (request.status === 200) {
                callback(request.responseText);
            }
        };
        request.send(null);
    }
};