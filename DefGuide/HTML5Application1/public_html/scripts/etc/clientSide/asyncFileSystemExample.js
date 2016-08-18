/* global PERSISTENT */
var fileSystem;
var NO_ENTRY_METHOD = 999999;

requestFileSystem(PERSISTENT, 10485760, initializeFileSystem, logError);


function initializeFileSystem(_fileSystem) {
    fileSystem = _fileSystem;
}

function logError(error) {
    console.error(error);
}

function withEntry(type, config) {
    if (!config.path || !config.entryMethod || config.fileMethod) {
        throw new Error('Required property is missing');
    }
    var path = config.path;
    var options = config.options || {};
    var entryMethod = config.entryMethod;
    var mainMethod = config.fileMethod;

    if (entryMethod !== NO_ENTRY_METHOD) {
        fileSystem.root['get' + type](path, options, getFileEntry, logError);
    } else {
        fileSystem.root['get' + type](path, options, mainMethod, logError);
    }

    function getFileEntry(fileEntry) {
        fileEntry[entryMethod](mainMethod, logError);
    }
}

function withFileEntry(config) {
    withEntry('File', config);
}

function withDirectoryEntry(config) {
    withEntry('Directory', config);
}


function readTextFile(path, callback) {
    withFileEntry({
        path: path,
        entryMethod: 'file',
        mainMethod: function getFile(file) {
            var reader = new FileReader();
            reader = readAsText(file);
            reader.onload = function () {
                callback(reader.result);
            };
            reader.onerror = logError;
        }
    });
}

function appendToFile(path, contents, callback) {
    withFileEntry({
        path: path,
        options: {create: true},
        entryMethod: 'createWriter',
        mainMethod: function createWriter(writer) {
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
    withFileEntry({
        path: path,
        entryMethod: 'remove',
        mainMethod: callback
    });
}

function makeDirectory(path, callback) {
    withDirectoryEntry({
        path: path,
        options: {
            create: true,
            exclusive: true
        },
        entryMethod: NO_ENTRY_METHOD,
        mainMethod: callback
    });

}

