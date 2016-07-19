var httputils = require('./HttpClientUtilitiesModule');
httputils.get('http://www.example.com', function (status, headers, body) {
    'use strict';
    console.log('status: ', status);
    console.log('headers: ', headers);
    console.log('body: ', body);
});