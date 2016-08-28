/* global statusHelper, logHelper, databaseHelper, cities */

var DATABASE_NAME = 'postalCodes';
var DATABASE_STORE = 'zipcodes';
var DATABASE_VERSION = 45;

window.indexedDB = getDeprefixed('indexedDB');
window.IDBTransaction = getDeprefixed('IDBTransaction') || {READ_WRITE: 'readwrite'};
window.IDBKeyRange = getDeprefixed('IDBKeyRange');

function getDeprefixed(methodName) {
    'use strict';
    var upperMethodName = methodName.charAt(0).toUpperCase() + methodName.slice(1);
    return window[methodName] ||
            window['webkit' + upperMethodName] ||
            window['moz' + upperMethodName] ||
            window['ms' + upperMethodName];
}

function withPostalCodeDatabase(onSuccess) {
    'use strict';
    databaseHelper.withDatabase(
            DATABASE_NAME, DATABASE_VERSION, onSuccess, initDatabase
            );
}

function initDatabase(database, transaction) {
    'use strict';
    var statusLine = statusHelper.createStatus('Initializing zipcode database');

    if (!database.objectStoreNames.contains(DATABASE_STORE)) {
        var zipcodeStore = database.createObjectStore(DATABASE_STORE, {
            keypath: 'zipcode',
            autoIncrement: false
        });
        zipcodeStore.createIndex('cities', 'city');
    }

    var zipcodeStore = transaction.objectStore(DATABASE_STORE);

    requestZipCodes();

    function requestZipCodes() {
        var xhr = new XMLHttpRequest();
        xhr.onerror = status.display;
        xhr.onprogress = handleDataChunk;
        xhr.onload = handleDataChunk;
        xhr.open('GET', 'data/zipcode.csv');
        xhr.send();

        var lastCharacter = 0;
        var numberOfLines = 0;

        function handleDataChunk(event) {
            var responseText = event.target.responseText;
            console.log('responseText', responseText);
            var lastNewLine = responseText.lastIndexOf('\n');
            if (lastNewLine > lastCharacter) {
                var chunk = responseText.substring(lastCharacter, lastNewLine);
                lastCharacter = lastNewLine + 1;

                var lines = chunk.split('\n');
                numberOfLines += lines.length;
                storeZipcodes(lines);
                status.display('Initializing zipcode database: loaded ' + numberOfLines + ' records.');
            }

            if (event.type === 'load') {
                cities.lookup('02134', function () {
                    document.body.removeChild(statusLine);
//                    withPostalCodeDatabase(func);
                });
            }

            function storeZipcodes(lines) {
                lines.toArray().forEach(function (line) {
                    console.log('line', line);
                    var fields = line.split(',');
                    zipcodeStore.put({
                        zipcode: fields[0],
                        city: fields[1],
                        state: fields[2],
                        latitude: fields[3],
                        longitude: fields[4]
                    });
                });
            }
        }
    }
}

function deleteDatabase() {
    databaseHelper.deleteDatabase(DATABASE_NAME);
}