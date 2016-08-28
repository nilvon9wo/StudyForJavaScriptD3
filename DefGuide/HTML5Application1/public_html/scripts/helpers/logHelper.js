var logHelper = {
    logError: function (error) {
        'use strict';
        console.error('IndexedDB error: ' + error.code + ' : ' + error.message);
        console.error('error: ' , error);
        console.dir(error);
    }
};