var co = require('co');
var thunkify = require('thunkify');
var fs = require('fs');
var path = require('path');

var readDir = thunkify(fs.readdir);
var stat = thunkify(fs.stat);

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

module.exports = co(function* (directory){
    var files;
    try {
        files = yield readDir(directory);
    }
    catch (error) {
        console.error('something happened whilst reading the directory');
    }
    
    var stats = yield getPaths(directory, files);
    var largest = getLargestFile(files, stats);
    return files[stats.indexOf(largest)];
});

