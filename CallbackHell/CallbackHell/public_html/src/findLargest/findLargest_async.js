var fs = require('fs');
var async = require('async');
var path = require('path');

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
    async.waterfall([
        function (next) {
            fs.readdir(directory, next);
        },
        function (files, next) {
            var paths = getPaths(directory, files);
            async.map(paths, fs.stat, function (error, stats) {
                next(error, files, stats);
            });
        },
        function (files, stats, next) {
            var largest = getLargestFile(files, stats);
            next(null, files[stats.indexOf(largest)]);
        }
    ]);
};