var fs = require('fs');
var path = require('path');

module.exports = function (directory, callback) {
    fs.readdir(directory, function (error, files) {
        if (error) {
            return callback(error);
        }
        var counter = files.length;
        var errored = false;
        var stats = [];

        files.forEach(function (file, index) {
            fs.stat(path.join(directory, file), function (error, stat) {
                if (errored) {
                    return;
                }

                if (error) {
                    errored = true;
                    return callback(error);
                }

                stats[index] = stat;
                if (--counter === 0) {
                    var largest = stats
                            .filter(function (stat) {
                                return stat.isFile();
                            })
                            .reduce(function (previous, next) {
                                return (previous.size > next.size) ?
                                        previous :
                                        next;
                            });
                    callback(null, files[stats.indexOf(largest)]);
                }
            });
        });

    });
};