/* global statusHelper, logHelper, IndexedDB, cities, Event */

var DATABASE_NAME = 'postalCodes';
var DATABASE_STORE = 'locations';
var DATABASE_VERSION = 53;

function withPostalCodeDatabase(onSuccess) {
    'use strict';
    IndexedDB.withDatabase({
        database: {
            name: DATABASE_NAME,
            version: DATABASE_VERSION
        },
        events: {
            success: function(event){
                var database = event.target.result;
                onSuccess(database, event);
            },
            upgradeneeded: IndexedDB.defaultDatabaseUpgrade({
                stores: {
                    locations: {
                        keyDefinition: {keyPath: 'zipcode', autoIncrement: true},
                        indexes: [
                            {propertyName: 'city', indexName: 'cities', options: {unique: false}}
                        ],
                        forceRecreate: true
                    }
                },
                data: {
                    locations: insertZipcodes
                }
            })
        }
    });
}

function insertZipcodes(zipcodeStore) {
    'use strict';
    console.log('INSERTING', zipcodeStore);
    var statusLine = statusHelper.createStatus('Initializing zipcode database');

    var xhr = new XMLHttpRequest();
    Event.add(xhr, 'error', status.display);
    Event.add(xhr, 'progress', handleDataChunk);
    Event.add(xhr, 'load', handleDataChunk);
    xhr.open('GET', 'data/free-zipcode-database.csv');
    xhr.send();

    var lastCharacter = 0;
    var numberOfLines = 0;

    function handleDataChunk(event) {
    console.log('HANDLING', event);
        var responseText = event.target.responseText;
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
            });
        }

        function storeZipcodes(lines) {
            console.log('STORING', lines);
            lines.toArray().forEach(function (line) {
                var fields = line.split(',');
                console.log('$$$ putting', fields);
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

