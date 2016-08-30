/* global DATABASE_NAME, logHelper, DATABASE_STORE, IndexedDB, DATABASE_VERSION */

var cities = {
    lookup: function (zipcode, callback) {
        'use strict';
        withPostalCodeDatabase(function (database, event) {
            console.log('database', database);
            IndexedDB.readRecordByKey({
                database: database,
                store: 'locations',
                key: zipcode,
                events: {
                    success: function (event) {
                        var resultCity = event.target.result;
                        if (resultCity) {
                            callback(resultCity.city + ', ' + resultCity.state);
                        } else {
                            callback('Unknown zip code');
                        }
                    }
                }
            });
        });
    },

    display: function (zipcode) {
        'use strict';
        cities.lookup(zipcode, function (cityName) {
            document.getElementById('city').value = cityName;
        });
    }
};