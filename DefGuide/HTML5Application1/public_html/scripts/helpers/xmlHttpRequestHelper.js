/* global FormData */

window.XMLHttpRequest = window.XMLHttpRequest || function () {
    try {
        return new ActiveXObject('Mxxml2.XMLHTTP.6.0');
    } catch (exception1) {
        try {
            return new ActiveXObject('Mxxml2.XMLHTTP.3.0');
        } catch (exception1) {
            throw new Error('XMLHttpRequest is not supported');
        }
    }
};

var xmlHttpRequestHelper = (function () {
    var REQUEST_DONE = XMLHttpRequest.DONE || 4;
    var REQUEST_SUCCESS = 200;
    var CONTENT_TYPE_HEADER = 'Content-Type';

    function getRequest(url, onreadystatechange) {
        send('GET', url, function (request) {
            request.onreadystatechange = onreadystatechange;
            request.send(null);
        });
    }

    function getContentType(request) {
        return request.getAllResponseHeaders(CONTENT_TYPE_HEADER);
    }

    function isDone(request) {
        return request.readyState === REQUEST_DONE;
    }

    function isSuccessful(request) {
        return request.status === REQUEST_SUCCESS;
    }

    function postRequest(url, content, contentType, onreadystatechange) {
        send('POST', url, function (request) {
            if (onreadystatechange) {
                request.onreadystatechange = onreadystatechange;
            }
            if (contentType) {
                request.setRequestHeader(CONTENT_TYPE_HEADER, contentType);
            }
            request.send(content);
        });
    }

    function send(httpMethod, target, func) {
        var request = new XMLHttpRequest();
        request.open(httpMethod, target);
        func(request);
    }

    function standardCallback(callback) {
        return function () {
            if (isDone(this) && callback) {
                callback(this);
            }
        };
    }

    return {
        encodeFormData: function (data) {
            if (!data) {
                return '';
            }
            var pairs = [];
            data.forEachOwnProperty(function (property) {
                if (data[property] !== 'function') {
                    var name = encodeURIComponent(property.replace(' ', '+'));
                    var value = data[property].toString();
                    value = encodeURIComponent(value.replace(' ', '+'));
                    pairs.push(name + '=' + value);
                }
            });
            return pairs.join('&');
        },
        get: function (url, callback) {
            getRequest(url, function () {
                if (isDone(this) && isSuccessful(this)) {
                    var type = getContentType(this);
                    if (type.indexOf('xml') !== -1 && this.responseXML) {
                        callback(this.responseXML);
                    } else if (type === 'application/json') {
                        callback(JSON.parse(this.responseText));
                    } else {
                        callback(this.responseText);
                    }
                }
            });
        },
        getData: function (url, data, callback) {
            var encodedUrl = url + '?' + this.encodeFormData(data);
            getRequest(encodedUrl, standardCallback(callback));
        },
        getText: function (url, callback) {
            getRequest(url, function () {
                if (isDone(this) && isSuccessful(this)) {
                    var type = getContentType(this);
                    if (type.match(/^text/)) {
                        callback(this.responseText);
                    }
                }
            });
        },
        getTextSync: function (url) {
            var request = new XMLHttpRequest();
            request.open('GET', url, false);
            request.send();

            if (!isSuccessful(request)) {
                throw new Error(request.statusText);
            }

            var type = getContentType(this);
            if (!type.match(/^text/)) {
                throw new Error('Expected textual response; got: ' + type);
            }
            return request.responseText;
        },
        postData: function (url, data, callback) {
            var encodedData = this.encodeFormData(data);
            postRequest(url, encodedData, 'application/x-www-form-urlencoded',
                    standardCallback(callback)
            );
        },
        postFormData: function (url, data, callback) {
          if (typeof FormData === 'undefined') {
              throw new Error('FormData is not implemented');
          }
          var formData = new FormData();
          data.forEachOwnProperty(function(property){
              var value = data[property];
              if (typeof value !== 'function') {
                  formData.append(name, value);
              }
          });
          postRequest(url, formData, undefined, standardCallback(callback));
        },
        postJSON: function (url, data, callback) {
            var jsonData = JSON.stringify(data);
            postRequest(url, jsonData, 'application/json', 
                standardCallback(callback)
                    );
        },
        postMessage: function (url, message) {
            postRequest(url, message, 'text/plain;charset=UTF-8');
        },
        postQuery: function (url, what, where, radius, callback) {
            var doc = document.implementation.createDocument('', 'query', null);
            var query = doc.documentElement;

            var find = doc.createElement('find');
            query.appendChild(find);
            find.setAttribute('zipcode', where);
            find.setAttribute('radius', radius);
            find.appendChild(doc.createTextNode(what));
            
            postRequest(url, doc, undefined, standardCallback(callback));
        }
    };
}());
