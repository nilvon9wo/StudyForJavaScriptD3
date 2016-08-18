var asyncFileSystem = (function() {
    'use strict';
    var fileSystem = requestFileSystemSync(PERSISTENT, 10485760);

    function readTextFile(name) {
        var file = fileSystem.root.getFile(name).file();
        return new FileReaderSync().readAsText(file);
    }

    function appendToFile(name, contents) {
        var writer = fileSystem.root.getFile(name, {create: true}).createWriter();
        writer.seek(writer.length);
        var blobBuilder = new BlobBuilder();
        blobBuilder.append(contents);
        writer.write(blobBuilder.getBlob());
    }

    function deleteFile(name) {
        fileSystem.root.getFile(name).remove();
    }

    function makeDirectory(name) {
        fileSystem.root.getDirectory(name, {create: true, exclusive: true});
    }

    function listFiles(path) {
        var directory = fileSystem.root;
        if (path) {
            directory = directory.getDirectory(path);
        }

        var lister = directory.createReader();
        var list = [];
        do {
            var entries = lister.readEntries();
            entries.toArray().forEach(function(entry) {
                var name = entry.name;
                if (entry.isDirectory) {
                    name += '/';
                    list.push(name);
                }
            });
        } while (entries.length > 0);
        return list;
    }

    function onmessage(event) {
        var func = self[e.data.function];
        var result = func.apply(null, e.data.args);
        postMessage(result);
    }

    return {
        readTextFile: readTextFile,
        appendToFile: appendToFile,
        deleteFile: deleteFile,
        makeDirectory: makeDirectory,
        listFiles: listFiles,
        onmessage: onmessage
    }
}());