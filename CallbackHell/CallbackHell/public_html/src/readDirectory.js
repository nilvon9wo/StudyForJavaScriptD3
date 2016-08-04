var source = null;
var destination = null;

var fileSystem = {
    readDirectory: function (source, callback) {
        try {
            var result = null; //...
            callback(undefined, result);
        } catch (exception) {
            callback(exception, undefined);
        }
    }
};

function generalManager(filePath, callback) {
    try {
        var result = null; //...
        callback(undefined, result);
    } catch (exception) {
        callback(exception, undefined);
    }
}

var widths = [];

fileSystem.readDirectory(source, function (error, files) {
    if (error) {
        console.error('Error finding files: ' + error);
    } else {
        files.forEach(function (fileName, fileIndex) {
            console.warn(fileName);
            generalManager(source + fileName).size(function (error, values) {
                if (error) {
                    console.error('Error identifying file size: ' + error);
                } else {
                    console.warn(fileName + ': ' + values);
                    var width = values.width;
                    var height = values.height;
                    var aspect = (values.width / values.height);
                    widths.forEach(function (width) {
                        height = Math.round(width / aspect);
                        console.warn('resizing' + fileName + ' to ' +
                                height + ' x ' + height
                                );
                        this.resize(width, height)
                                .write(
                                        destination + 'w' + width + '_' + fileName,
                                        function (error) {
                                            if (error) {
                                                console.error('Error writing file: ' + error);
                                            }
                                        });
                    });
                }
            }).bind(this);
        });
    }
});
