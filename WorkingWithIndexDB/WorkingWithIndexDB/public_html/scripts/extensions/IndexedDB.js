/* global IndexedDB, indexedDB, Event, Log, IDBKeyRange */

var IndexedDB = (function() {

    function monitorTransaction(config) {
        if (!config || !config.database || !config.store) {
            throw new Error('monitorTransaction is missing required properties');
        }

        var transaction = config.database.transaction([config.store], 'readonly');
        addEvents(transaction, config);
        return transaction;
    }

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

    function openRequest(config) {
        if (!config || !config.database.name || !config.database.version) {
            throw new Error('openRequest is missing required properties');
        }

        var openRequest = indexedDB.open(config.database.name, config.database.version);
        addEvents(openRequest, config);
        return openRequest;
    }

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

    function defaultUpgrade(stores) {
        return function upgradeneeded(event) {
            var transaction = event.srcElement && event.srcElement.transaction ||
                event.originalTarget && event.originalTarget.transaction;
            var database = event.target.result;

            for (var store in stores) {
                if (database.objectStoreNames.contains(store) && stores[store].forceRecreate) {
                    database.deleteObjectStore(store);
                }


                upgradeStore(transaction, database, store);
            }
        };

        function upgradeStore(transaction, database, store) {
            IndexedDB.createStore({
                database: database,
                store: store,
                keyDefinition: stores[store].keyDefinition,
                indexes: stores[store].indexes
            });
            var store = transaction.objectStore(store);
            if (stores[store]) {
                addRecords(store, stores[store].data);
            }
        }

        function addRecords(store, records) {
            for (var recordKey in records) {
                store.add(records[recordKey], recordKey);
            }
        }
    }

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

    function doCount(config) {
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

    return {
        isSupported: 'indexedDB' in window,
        monitorTransaction: monitorTransaction,
        openRequest: openRequest,
        createStore: createStore,
        defaultUpgrade: defaultUpgrade,
        addRecord: addRecord,
        putRecord: putRecord,
        deleteRecord: deleteRecord,
        readRecordByKey: readRecordByKey,
        readRecordByIndex: readRecordByIndex,
        doCount: doCount,
        withCursor: withCursor
    };
}());

