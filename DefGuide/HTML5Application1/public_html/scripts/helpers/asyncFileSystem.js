/* global PERSISTENT */
var asyncFileSystem = (function() {
    'use strict';
    var fileSystem;

    requestFileSystem(PERSISTENT, 10485760, initializeFileSystem, logError);

    function initializeFileSystem(_fileSystem) {
        'use strict';
        fileSystem = _fileSystem;
    }

    function logError(error) {
        'use strict';
        console.error(error);
    }

    function withFileSystem(resourceType, config) {
        'use strict';
        if (!config.path || config.fileMethod) {
            throw new Error('Required property is missing');
        }
        var path = config.path;
        var options = config.options || {};
        var entryMethod = config.entryMethod;
        var fileMethod = config.fileMethod;

        var func = (entryMethod) ? getFileEntry : fileMethod;
        fileSystem.root['get' + resourceType](path, options, func, logError);

        function getFileEntry(fileEntry) {
            fileEntry[entryMethod](fileMethod, logError);
        }
    }

    function withFileEntry(config) {
        'use strict';
        withFileSystem('File', config);
    }

    function withDirectory(config) {
        'use strict';
        withFileSystem('Directory', config);
    }


    function readTextFile(path, callback) {
        'use strict';
        withFileEntry({
            path: path,
            entryMethod: 'file',
            fileMethod: function getFile(file) {
                var reader = new FileReader();
                reader = asyncFileSystem.readAsText(file);
                reader.onload = function() {
                    callback(reader.result);
                };
                reader.onerror = logError;
            }
        });
    }

    function appendToFile(path, contents, callback) {
        'use strict';
        withFileEntry({
            path: path,
            options: {create: true},
            entryMethod: 'createWriter',
            fileMethod: function createWriter(writer) {
                writer.seek(writer.length);
                var blobBuilder = new BlobBuilder();
                blobBuilder.append(contents);
                var blob = blobBuilder.getBlob();
                writer.write(blob);
                writer.onerror = logError;

                if (callback) {
                    writer.onwrite = callback;
                }
            }
        });
    }

    function deleteFile(path, callback) {
        'use strict';
        withFileEntry({
            path: path,
            entryMethod: 'remove',
            mainMethod: callback
        });
    }

    function makeDirectory(path, callback) {
        'use strict';
        withDirectory({
            path: path,
            options: {
                create: true,
                exclusive: true
            },
            fileMethod: callback
        });
    }

    function listFiles(path, callback) {
        'use strict';
        if (!path) {
            getFiles(fileSystem.root);
        } else {
            withDirectory(path, getFiles);
        }

        function getFiles(directory) {
            var reader = directory.createReader();
            var list = [];
            reader.readEntries(handleEntries, logError);

            function handleEntries(entries) {
                if (entries.length === 0) {
                    callback(list);
                } else {
                    entries.toArray().forEach(function(entry) {
                        var name = entry.name;
                        if (entry.isDirectory) {
                            name += '/';
                        }
                        list.push(name);
                    });

                    reader.readEntries(handleEntries, logError);
                }
            }
        }
    }

    return {
        readTextFile: readTextFile,
        appendToFile: appendToFile,
        deleteFile: deleteFile,
        makeDirectory: makeDirectory,
        listFiles: listFiles
    };
}());
