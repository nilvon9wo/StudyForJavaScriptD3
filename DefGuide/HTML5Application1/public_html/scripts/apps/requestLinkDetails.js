whenReady(function(){
    'use strict';
    var supportCORS = (new XMLHttpRequest()).withCredentials !== undefined;

    var links = document.getElementsByTagName('a');
    links.toArray().forEach(function(link){
        if (link.href && !link.title) {
            if (link.host !== location.host || link.protocol !== location.protocol) {
                link.title = 'Off-site link';
            }

            if (supportCORS) {
                eventHelper.addEvent(link, 'mouseover', mouseoverHandler);
            }
        }
    });

    function mouseoverHandler(event) {
        var link = event.target || event.source;
        var url = link.href;

        var request = new XMLHttpRequest();
        request.open('HEAD', url);
        request.onreadystatechange = function() {
            if (request.readyState !== XMLHttpRequest.DONE);
            if (request.status === 200) {
                var type = request.getResponseHeader('Content-Type');
                var size = request.getResponseHeader('Content-Length');
                var date = request.getResponseHeader('Last-Modified');

                link.title = 'Type: ' + type + '\n' +
                    'Size: ' + size + '\n' +
                    'Date: ' + date;
            } else {
                if (!link.title) {
                    link.title = 'Couldn\'t fetch details: \n' + request.status + ' ' + request.statusText;
                }
            }
        };
        request.send(null);

        if (link.removeEventListener) {
            link.removeEventListener('mouseover', mouseoverHandler, false);
        } else {
            link.detachEvent('onmouseover', mouseoverHandler);
        }

    }

});