/* global eventHelper, logHelper, transaction */
// See http://code.tutsplus.com/tutorials/working-with-indexeddb--net-34673

var DATABASE_NAME = 'test';
var DATABASE_VERSION = 6;

var isIndexDBSupported = false;
var database;

eventHelper.addEvent(document, 'DOMContentLoaded', function () {
    if ('indexedDB' in window) {
        isIndexDBSupported = true;
        console.info('YES!!! I can do it!  Woot!');
    } else {
        console.error('I am sad.');
    }

    if (isIndexDBSupported) {
        var openRequest = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
        openRequest.onupgradeneeded = function (event) {
            var transaction = event.srcElement.transaction;
            console.info('Upgrading: running onupgradeneeded');
            var database = event.target.result;
            
            if (!database.objectStoreNames.contains('firstObjectStore')) {
                database.createObjectStore('firstObjectStore');
            }

            if (!database.objectStoreNames.contains('secondObjectStore')) {
                database.createObjectStore('secondObjectStore');
            }
            
            if (!database.objectStoreNames.contains('people')) {
                database.createObjectStore('people');
            }

            //var transaction = database.transaction(['people'], 'readwrite');
            var store = transaction.objectStore('people');
            var person = {
                name: 'Brian Kessler',
                email: 'kessler.bm@gmail.com',
                created: new Date()
            };
            
            store.add(person, 1);
        };

        openRequest.onsuccess = function (event) {
            console.info('Success!  Woor!  Did it!');
            database = event.target.result;
        };

        openRequest.onerror = logHelper.logError;
    }
});

