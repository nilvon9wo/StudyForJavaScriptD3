var fs = require('fs');

fs.readFile('/Does/not/exist', handleFile);

function handleFile(error, file){
    if (error) {
        return console.error('Uhoh, there was an error', error);
    }
    // ...
}