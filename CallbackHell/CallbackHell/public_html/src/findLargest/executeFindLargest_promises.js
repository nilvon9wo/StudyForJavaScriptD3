var findLargest = require('./findLargest_promises');
findLargest('./path/to/dir')
        .then(function(fileName) {
            console.info('largest file was: ', fileName);
        })
        .catch(console.error);
