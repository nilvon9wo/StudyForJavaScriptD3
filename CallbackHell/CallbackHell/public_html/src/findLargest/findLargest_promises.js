var fs = require('fs');
var path = require('path');
var Q = require('q');

var fsReadDir = Q.denodeify(fs.readdir);
var fsStat = Q.denodeify(fs.stat);

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

module.exports = function (directory) {
    return fsReadDir(directory)
            .then(function (files) {
                return Q.all(getPaths(files))
                        .then(function (stats) {
                            return {
                                files: files,
                                stats: stats
                            };
                        });
            })
            .then(function (data) {
                var files = data.files;
                var stats = data.stats;
                var largest = getLargestFile(files, stats);
                return files[stats.indexOf(largest)];
            });
};