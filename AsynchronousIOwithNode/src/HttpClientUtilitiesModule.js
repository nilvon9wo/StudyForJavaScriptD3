function determineType(data) {
    'use strict';
    if (data instanceof Buffer) {
        return 'application/octet-stream';
    }
    else if (typeof data === 'string') {
        return 'text/plain; charset=UTF-8';
    }
    else if (typeof data === 'object') {
        return 'application/x-www-form-urlencoded';
    }
}

function respond(method, url, data, callback) {
    'use strict';
    url = require('url').parse(url);
    var hostname = url.hostname;
    var port = url.port || 80;
    var path = url.pathname;
    var query = url.query;
    if (query) {
        path += '?' + query;
    }
    if (data === null) {
        data = '';
    }

    var client = require('http').createClient(port, hostname);
    var contentType = (method === 'POST') ? determineType(data) : undefined;

    var requestObj = {Host: hostname};
    if (contentType) {
        requestObj['Content-Type'] = contentType;
    }

    var request = client.request(method, path, requestObj);
    if (method === 'POST') {
        if (typeof data === 'object') {
            data = require('querystring').stringify(data);
        }
        request.write(data);
    }

    request.end();

    request.on('response', function (response) {
        response.setEncoding('utf8');
        var body = '';
        response.on('data', function (chunk) {
            body += chunk;
        });
        response.on('end', function () {
            if (callback) {
                callback(response.statusCode, response.headers, body);
            }
        });
    });
}

exports.get = function (url, callback) {
    'use strict';
    respond('GET', url, undefined, callback);
};

exports.post = function (url, data, callback) {
    'use strict';
    respond('POST', url, data, callback);
};