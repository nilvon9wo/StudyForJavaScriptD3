var findLargest = require('./findLargest_modular');
findLargest('./path/to/dir', function (error, fileName){
    if (error) {
        return console.error(error);
    }
    
    console.info('largest file was: ', fileName);
});