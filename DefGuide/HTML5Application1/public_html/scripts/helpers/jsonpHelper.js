var jsonpHelper = (function() {
    'use strict';
    function getJSONP(url, callback) {
        var callbackNumber = 'cb' + getJSONP.counter++;
        var callbackName = 'getJSONP.' + callbackNumber;
        url += ((url.indexOf('?') === -1) ? '?' : '&') + 'jsonp=' + callbackName;

        var script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);

        getJSONP[callbackNumber] = function(response) {
            try {
                callback(response);
            }
            finally {
                delete getJSONP[callbackNumber];
                script.parentNode.removeChild(script);
            }
        }
    }

    getJSONP.counter = 0;


    return {
        getJSONP: getJSONP
    }

}());