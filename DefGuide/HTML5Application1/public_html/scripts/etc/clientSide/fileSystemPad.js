var fileSystem = requestFileSystemSync(PERSISTENT, 1024 * 1024);

requestFileSystem(
    TEMPORARY,
    50 * 1024 * 1024,
    function(fileSystem) {
        'use strict';
        // TODO
    },
    function(error) {
        'use strict';
        console.error(error);
    }
);

requestFileSystem(
    PERSISTENT,
    10 * 1024 * 1024,
    function(fileSystem) {
        'use strict';
        fileSystem.root.getFile('hello.txt', {}, function(fileEntry){
            fileEntry.file(function(file){
                var reader = new FileReader();
                reader.readAsText(file);
                reader.onload = function() {
                    console.info(reader.result);
                }
            });
        });
    }
);