/* global DATABASE_NAME, IDBKeyRange, logHelper, DATABASE_STORE */

var zipcodes = {
    lookup: function (city, callback) {
        'use strict';
        withPostalCodeDatabase(function (database) {
            var transaction = database.transaction([DATABASE_NAME], 'readonly');
            var zipcodeStore = transaction.objectStore(DATABASE_STORE);
            var cityIndex = zipcodeStore.index('cities');
            var range = new IDBKeyRange.only(city);
            var request = cityIndex.openCursor(range);
            request.onerror = logHelper.logError;
            request.onsuccess = function () {
                var cursor = request.result;
                if (!cursor) {
                    return;
                }
                var zipcode = cursor.value;
                callback(zipcode);
                cursor.continue();
            };
        });
    },
    display: function (city) {
        'use strict';
        var output = document.getElementById('zipcodes');
        output.innerHTML = 'Matching zipcodes';
        zipcodes.lookup(city, function (result) {
            var div = document.createElement('div');
            var text = result.zipcode + ': ' + result.city + ', ' + result.state;
            div.appendChild(document.createTextNode(text));
            output.appendChild(div);
        });
    }
};
