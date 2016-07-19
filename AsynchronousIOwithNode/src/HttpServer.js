var http = require('http');
var fs = require('fs');

var EOL = '\r\n';

function writeHead(response, statusCode, contentType) {
    'use strict';
    statusCode = statusCode || 200;
    contentType = contentType || 'text/plain; charset=UTF-8';
    response.writeHead(statusCode, {'Content-Type': contentType});
}

function testDelay(url, response) {
    'use strict';
    var delay = parseInt(url.query) || 2000;
    writeHead(response);
    response.write('Sleeping for ' + delay + ' milliseconds...');
    setTimeout(function () {
        response.write('done.');
        response.end();
    }, delay);
}

function testMirror(request, response) {
    'use strict';
    writeHead(response);
    response.write(request.method + ' ' + request.url + ' HTTP/' + request.httpVersion + EOL);
    for (var header in request.headers) {
        if (request.headers.hasOwnProperty(header)) {
            response.write(header + ': ' + request.headers[header] + EOL);
        }
    }
    response.write(EOL);

    request.on('data', function (chunk) {
        response.write(chunk);
    });

    request.on('end', function () {
        response.end();
    });
}

function serveFileFromLocalDirectory(url, response) {
    var filename = url.pathname.substring(1);

    function selectType(filename) {
        'use strict';

        function withUTF8(type) {
            return type + '; charset=UTF-8';
        }

        switch (filename.substring(filename.lastIndexOf('.') + 1)) {
            case 'html':
            case 'htm' :
                return withUTF8('text/html');
            case 'js' :
                return withUTF8('application/javascript');
            case 'css':
                return withUTF8('text/css; charset');
            case 'txt':
                return withUTF8('text/plain; charset');
            case 'manifest':
                return withUTF8('text/cache-manifest; charset');
            default:
                return 'application/octet-stream';
        }
    }

    function writeReponse(statusCode, type, content) {
        'use strict';
        response.writeHead(statusCode, type);
        response.write(content.toString());
        response.end();
    }

    function makeResponse(error, content) {
        'use strict';
        if (error) {
            writeReponse(404, null, error.message);
        }
        else {
            try {
                writeReponse(200, selectType(filename), content);
            }
            catch (e) {
                writeReponse(404, null, e);
            }

        }
    }

    fs.readFile(filename, makeResponse);
}


var server = new http.Server();
server.listen(8000);

server.on('request', function (request, response) {
    'use strict';
    var url = require('url').parse(request.url);

    switch (url.pathname) {
        case '/test/delay':
            testDelay(url, response);
            break;
        case '/test/mirror':
            testMirror(request, response);
            break;
        default:
            serveFileFromLocalDirectory(url, response);
    }
});

