var fileHelper = {
    fileInfo: function(files) {
        'use strict';
        files.toArray().forEach(function(file){
            console.info(file.name, file.size, file.type, file.lastModifiedDate);
        });
    }
}