var Log = Log || {};
Log.error = Log.error || function (error) {
    'use strict';
    console.error(
            error.message ? error.message : '',
            error.filename ? '\n' + error.filename + ':' + error.lineno : '',
            error
            );
};

