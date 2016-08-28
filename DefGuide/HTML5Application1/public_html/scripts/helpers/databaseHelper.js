/* global indexedDB, logHelper, statusHelper */

var databaseHelper = {
    withDatabase: function (databaseName, databaseVersion, onSuccess, onUpgradeNeeded) {
        'use strict';
        var request = indexedDB.open(databaseName, databaseVersion);
        request.onupgradeneeded = function (event) {
            console.log('event', event);
            onUpgradeNeeded(event.target.result, event.originalTarget.transaction);
        };
        request.onsuccess = function (event) {
            var database = event.target.result;
            if (database.version === databaseVersion) {
                onSuccess(database);
            } else {
                console.warn('Database is not ready yet.');
            }
        };
        request.onerror = logHelper.logError;
    },
    initDatabase: function (config, callback) {
        'use strict';
        var databaseName = config.databaseName;
        var storeName = config.storeName;
        var database = config.database;
        var properties = config.properties;
        var indexes = config.indexes;
        var build = config.build;

        try {
            this.deleteDatabase(databaseName);
        } catch (error) {
            console.warn('Could not delete any database:', error);
        }

        var store = database.createObjectStore(databaseName, properties);
        if (indexes) {
            indexes.forEach(function (index) {
                store.createIndex(index.name, index.keyPath);
            });
        }

        build(store);
        callback();
    },
    deleteDatabase: function (databaseName) {
        try {
            var request = window.indexedDB.deleteDatabase(databaseName);
            request.onSuccess = function () {
                alert('deleted');
            };
            request.onError = logHelper.logError;
        } catch (error) {
            logHelper.logError(error);
        }
    }
};