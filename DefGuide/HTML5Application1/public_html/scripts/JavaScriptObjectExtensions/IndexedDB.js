/* global IndexedDB, indexedDB, Event, Log, IDBKeyRange */

var IndexedDB = (function() {
    
    // Windows ---------------------------------------------------------------------------
    
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
    
    // Database ---------------------------------------------------------------------------
    
    function withDatabase(config) {
        console.log('withDatabase', config);
        if (!config || !config.database.name || !config.database.version) {
            throw new Error('openRequest is missing required properties');
        }

        var openRequest = indexedDB.open(config.database.name, config.database.version);
        addEvents(openRequest, config);
        return openRequest;
    }

    function defaultDatabaseUpgrade(config) {
        var stores = config.stores;
        var data = config.data;
        
        return function upgradeneeded(event) {
            console.log('upgradeneeded',event);
            var transaction = event.srcElement && event.srcElement.transaction ||
                event.originalTarget && event.originalTarget.transaction;
            var database = event.target.result;

            for (var storeName in stores) {
                if (database.objectStoreNames.contains(storeName) && stores[storeName].forceRecreate) {
                    database.deleteObjectStore(storeName);
                }

                upgradeStore(transaction, database, storeName);
            }
            
            console.log('$$$ .. data', data);
            if (data) {
                for (var store in data) {
                    if (typeof data[store] === 'function') {
                        console.log('$$$$ another approach... data[store]', data[store]);
                        data[store](getTransactionStore({database:database}), true);
                    } else {
                        // TODO 
                    }
                }
            }
        };

        function upgradeStore(transaction, database, storeName) {
            console.log('upgradeStore',transaction, database, storeName);
            IndexedDB.createStore({
                database: database,
                store: storeName,
                keyDefinition: stores[storeName].keyDefinition,
                indexes: stores[storeName].indexes
            });
        }

        function addRecords(transactionStore, records) {
            console.log('addRecords', transactionStore, records);
            for (var recordKey in records) {
                transactionStore.add(records[recordKey], recordKey);
            }
        }
    }

    function deleteDatabase (databaseName) {
        var request = window.indexedDB.deleteDatabase(databaseName);
        request.onSuccess = function () {
            alert('deleted');
        };
    }

    // Transactions ---------------------------------------------------------------------------

    function monitorTransaction(config) {
        if (!config || !config.database || !config.store) {
            throw new Error('monitorTransaction is missing required properties');
        }

        var transaction = config.database.transaction([config.store], 'readonly');
        addEvents(transaction, config);
        return transaction;
    }

    // Stores ---------------------------------------------------------------------------

    function createStore(config) {
        if (!config || !config.database || !config.store) {
            throw new Error('createStore is missing required properties');
        }
        var database = config.database;
        var store = config.store;
        var keyDefinition = config.keyDefinition;
        var indexes = config.indexes;

        var objectStore = database.createObjectStore(store, keyDefinition);
        if (indexes) {
            indexes.forEach(function(index) {
                var propertyName = index.propertyName;
                var indexName = index.indexName || propertyName;
                var options = index.options || {};
                objectStore.createIndex(indexName, propertyName, options);
            });
        }
        return objectStore;
    }

    function getTransactionStore(config, isWritable) {
        if (!config || !(config.database || config.transaction)) {
            throw new Error('getTransactionStore is missing required properties');
        }
        var transaction = config.transaction || (function() {
                var transactionType = isWritable || config.isWritable ? 'readwrite' : 'readonly';
                return config.database.transaction([config.store], transactionType);
            }());
        addEvents(transaction, config, 'transaction');
        return transaction.objectStore(config.store);
    }

    // Ranges ---------------------------------------------------------------------------

    function getRange(config) {
        var range = config.range;
        if (!range) {
            return;
        }

        if (range && !config.index) {
            throw new Error('Range requires index');
        }

        if (range.only) {
            return IDBKeyRange.only(range.only);
        }

        var lowerBound = range.lowerBound && range.lowerBound.trim();
        var upperBound = range.upperBound && range.upperBound.trim();

        if (lowerBound && upperBound) {
            return IDBKeyRange.bound(lowerBound, upperBound);
        } else if (lowerBound) {
            return IDBKeyRange.lowerBound(lowerBound);
        } else if (upperBound) {
            return IDBKeyRange.upperBound(upperBound);
        }

        throw new Error('Range is invalid');
    }

    // Records ---------------------------------------------------------------------------

    function addRecord(config) {
        if (!config || !config.database || !config.store || !config.record) {
            throw new Error('addRecord is missing required properties');
        }

        var request = getTransactionStore(config, true).add(config.record, config.key);
        addEvents(request, config);
    }

    function putRecord(config) {
        if (!config || !config.database || !config.store || !config.record) {
            throw new Error('addRecord is missing required properties');
        }

        var request = getTransactionStore(config, true).put(config.record);
        addEvents(request, config);
    }

    function deleteRecord(config) {
        if (!config || !config.database || !config.store || !config.key) {
            throw new Error('addRecord is missing required properties');
        }

        var request = getTransactionStore(config, true).delete(config.key);
        addEvents(request, config);
    }

    function readRecordByKey(config) {
        if (!config || !config.store || !config.key) {
            throw new Error('readRecordByKey is missing required properties');
        }

        var request = getTransactionStore(config).get(config.key);

        config.events = config.events || {};
        config.events.success = config.events.success || config.callback;
        addEvents(request, config);
    }

    function readRecordByIndex(config) {
        if (
            !config || !config.store || !config.indexName || !config.indexValue
        ) {
            throw new Error('readRecordByIndex is missing required properties');
        }

        var request = getTransactionStore(config).index(config.indexName)
            .get(config.indexValue);

        config.events = config.events || {};
        config.events.success = config.events.success || config.callback;
        addEvents(request, config);
    }

    function doRecordCount(config) {
        if (!config || !config.store) {
            throw new Error('readRecordByIndex is missing required properties');
        }
        var request = getTransactionStore(config).count();
        addEvents(request, config);
    }

    function withCursor(config) {
        if (!config || !config.store || !config.cursorCallback) {
            throw new Error('cursoredReadRecord is missing required properties');
        }

        var store = getTransactionStore(config);
        var source = (config.index) ? store.index(config.index) : store;
        var range = getRange(config);
        var requestCursor = source.openCursor(range);

        Event.add(requestCursor, 'success', function(event) {
            var cursor = event.target.result;
            if (cursor) {
                config.cursorCallback(cursor);
                cursor.continue();
            }
        });
    }

    // Other Helpers ---------------------------------------------------------------------------

    function addEvents(target, config, eventSetPrefix) {
        var eventSetName = 'events';
        if (eventSetPrefix) {
            eventSetName = eventSetPrefix + 'Events';
        }

        if (config[eventSetName]) {
            for (var key in config[eventSetName]) {
                Event.add(target, key, config[eventSetName][key]);
            }
        }
    }


    return {
        // Database
        isSupported: 'indexedDB' in window,
        defaultDatabaseUpgrade: defaultDatabaseUpgrade,
        deleteDatabase: deleteDatabase,
        withDatabase: withDatabase,
        
        // Transaction
        monitorTransaction: monitorTransaction,

        // Store
        createStore: createStore,

        // Record
        addRecord: addRecord,
        deleteRecord: deleteRecord,
        doRecordCount: doRecordCount,
        putRecord: putRecord,
        readRecordByKey: readRecordByKey,
        readRecordByIndex: readRecordByIndex,
        withCursor: withCursor
    };
}());

