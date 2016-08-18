var DATABASE_NAME = 'postalCodes';
var DATABASE_VERSION = 7;

var indexedDB = getDeprefixed('indexedDB');
var IDBTransaction = getDeprefixed('IDBTransaction');
var IDBKeyRange = getDeprefixed('IDBKeyRange');

function getDeprefixed(methodName) {
    'use strict';
    return window[methodName] ||
            window['webkit' + methodName] ||
            window['moz' + methodName];
}

function logError(error) {
    'use strict';
    console.error('IndexedDB error: ' + error.code + ' : ' + error.message);
}

function withDatabase(func) {
    'use strict';
    var request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onerror = logError;
    request.onsuccess = function() {
        'use strict';
        var database = request.result;
        if (database.version === DATABASE_VERSION) {
            func(request.result);
        } else {
            console.warn('Database is not ready yet.');
        }
    };
    request.onupgradeneeded = function(event) {
        initDatabase(event.target.result, func);
    };
}

function createStatus(){
    'use strict';
    var statusLine = document.createElement('div');
    statusLine.className = 'statusLine';
    document.body.appendChild(statusLine);
    display('Initializing zipcode database');
    statusLine.display = display;
    return statusLine;

    function display(message) {
        statusLine.innerHTML = message.toString();
    }

}

function initDatabase(database, func) {
    'use strict';
    var statusLine = createStatus();

    try {
        database.deleteObjectStore(DATABASE_NAME);
    }
    catch (e) {
        console.warn('Could not delete any database.');
    }

    var zipcodeStore = database.createObjectStore(DATABASE_NAME, {
        keypath: 'zipcode',
        autoIncrement: false
    });
    zipcodeStore.createIndex('cities', 'city');
    requestZipCodes();

    function requestZipCodes() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/zipcode.csv');
        xhr.send();
        xhr.onerror = status.display;
        xhr.onprogress = handleDataChunk;
        xhr.onload =  handleDataChunk;

        var lastCharacter = 0;
        var numberOfLines = 0;

        function handleDataChunk(event) {
            var lastNewLine = xhr.responseText.lastIndexOf('\n');
            if (lastNewLine > lastCharacter) {
                var chunk = xhr.responseText.substring(lastCharacter, lastNewLine);
                lastCharacter = lastNewLine + 1;

                var lines = chunk.split('\n');
                numberOfLines += lines.length;
                storeZipcodes(lines);
                status.display('Initializing zipcode database: loaded ' + numberOfLines + ' records.');
            }

            if (event.type === 'load') {
                lookupCity('02134', function(){
                    document.body.removeChild(statusLine);
                    withDatabase(func);
                });
            }

            function storeZipcodes(lines) {
                zipcodeStore.createIndex('zipcode', 'zipcode', {unique: true});
                zipcodeStore.createIndex('city', 'city', {unique: false});

                zipcodeStore.transaction.oncomplete = function(){
                    lines.toArray().forEach(function(line){
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
                    console.log('zipcodeStore', zipcodeStore);
                };
            }
        }
    }
}

function lookupCity(zip, callback) {
    'use strict';
    withDatabase(function(database){
        var transaction = database.transaction([DATABASE_NAME], 'readonly', 0);
        var zipcodeStore = transaction.objectStore(DATABASE_NAME);

        var request = zipcodeStore.get(zip);
        request.onerror = logError;
        request.onsuccess = function() {
            var resultCity = request.result;
            if (resultCity) {
                callback(resultCity.city + ', ' + resultCity.state);
            } else {
                callback('Unknown zip code');
            }
        }
    });
}

function lookupZipcodes(city, callback) {
    'use strict';
    withDatabase(function(database){
        var transaction = database.transaction([DATABASE_NAME], 'readonly', 0);
        var zipcodeStore = transaction.objectStore(DATABASE_NAME);
        var cityIndex = zipcodeStore.index('cities');
        var range = new IDBKeyRange.only(cityIndex);
        var request = index.openCursor(range);
        request.onerror = logError;
        request.onsuccess = function() {
            var cursor = request.result;
            if (!cursor) {
                return;
            }
            var zipcode = cursor.value;
            callback(zipcode);
            cursor.continue();
        }
    });
}

function displayCity(zipcode) {
    'use strict';
    lookupCity(zipcode, function(cityName){
        document.getElementById('city').value = cityName;
    });
}

function displayZipcodes(city) {
    'use strict';
    var output = document.getElementById('zipcodes');
    output.innerHTML = 'Matching zipcodes';
    lookupZipcodes(city, function(result){
        var div = document.createElement('div');
        var text = result.zipcode + ': ' + result.city + ', ' + result.state;
        div.appendChild(document.createTextNode(text));
        output.appendChild(div);
    });
}

