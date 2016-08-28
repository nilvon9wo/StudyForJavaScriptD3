/* global DATABASE_NAME, logHelper, DATABASE_STORE */

var cities = {
    lookup: function (zip, callback) {
        'use strict';
        withPostalCodeDatabase(function (database) {
            var transaction = database.transaction([DATABASE_NAME], 'readonly');
            var zipcodeStore = transaction.objectStore(DATABASE_STORE);

            var request = zipcodeStore.get(zip);
            request.onerror = logHelper.logError;
            request.onsuccess = function () {
                var resultCity = request.result;
                if (resultCity) {
                    callback(resultCity.city + ', ' + resultCity.state);
                } else {
                    callback('Unknown zip code');
                }
            };
        });
    },
    display: function (zipcode) {
        'use strict';
        cities.lookup(zipcode, function (cityName) {
            document.getElementById('city').value = cityName;
        });
    }
};