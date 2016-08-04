var Promise = require('bluebird');
var fs = require('fs');
Promise.promisifyAll(fs);

var myFile = '/tmp/test';

fs.readFile(myFile, 'utf8', appendText)
        .then(function appendText(text) {
            text += '\nAppended something!';
            fs.writeFile(myFile, text);
        })
        .then(function notifyUser() {
            console.log('Appended text!');
        })
        .catch(function (error) {
            console.error(error);
        });
