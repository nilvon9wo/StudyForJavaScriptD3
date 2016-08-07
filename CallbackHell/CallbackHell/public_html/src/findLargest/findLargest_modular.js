var fs = require('fs');
var path = require('path');

function getStats(paths, callback) {
    var counter = paths.length;
    var errored = false;
    var stats = [];

    paths.forEach(function (path, index) {
        fs.stat(path, function (error, stat) {
            if (errored) {
                return;
            }

            if (error) {
                errored = true;
                return callback(error);
            }

            stats[index] = stat;
            if (--counter === 0) {
                callback(null, stats);
            }
        });
    });
}

function getPaths(directory, files) {
    return files.map(function (file) {
        return path.join(directory, file);
    });
}

function getLargestFile(files, stats) {
    var largest = stats
            .filter(function (stat) {
                return stat.isFile();
            })
            .reduce(function (previous, next) {
                return (previous.size > next.size) ?
                        previous :
                        next;
            });
    return files[stats.indexOf(largest)];
}

module.exports = function (directory, callback) {
    fs.readdir(directory, function (error, files) {
        if (error) {
            return callback(error);
        }

        var paths = getPaths(directory, files);
        getStats(paths, function(error, stats){
            if (error) {
                return callback(error);
            }
            
            var largestFile = getLargest(files, stats);
            callback(null, largestFile);
        });
    });
};