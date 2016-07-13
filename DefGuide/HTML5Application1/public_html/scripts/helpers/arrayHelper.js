// Global ----------------------------------------------

arrayHelper = {
    compareBy: function (name, minor) {
        return function (o, p) {
            var a, b;
            if (typeof o === 'object' && typeof p === 'object' && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return typeof minor === 'function' ? minor(o, p) : 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            } else {
                throw {
                    name: 'Error',
                    message: 'Expected an object when sorting by ' + name
                };
            }
        };
    },
    compareNumbers: function (a, b) {
        a - b;
    },
    compareSimpleValues: function (a, b) {
        if (a === b) {
            return 0;
        }
        if (typeof a === typeof b) {
            return a < b ? -1 : 1;
        }
        return typeof a < typeof b ? -1 : 1;
    },
    isArray: Array.isArray || function (value) {
        return (typeof value === 'object') &&
            ( Object.classOf && Object.classOf(value) === 'Array') ||
            (value &&
                typeof value.length === 'number' &&
                typeof value.splice === 'function' && !(value.propertyIsEnumerable('length'))
            );
    }
};

// Instance ---------------------------------------

Array.method('areEqualArrays', function (a, b) {
    'use strict';
    if (a.length != b.length) {
        return false;
    }

    try {
        a.forEach(function (element, index) {
            if (element !== b[index]) {
                throw BreakException;
            }
        });
    }
    catch (e) {
        return false;
    }
    return true;
});

Array.method('closeGaps', function () {
    'use strict';
    return this.filter(function (x) {
        return x !== undefined && x !== null;
    });
});

Array.method('findAllIndexes', function (x) {
    'use strict';
    var results = [];
    var length = this.length;
    var position = 0;

    while (position < length) {
        position = this.indexOf(x, position);
        if (position === -1) {
            break;
        }
        results.push(position);
        position++;
    }

    return results;
});

Array.method('flatten', function makeFlat() {
    function makeFlat(item, newArray) {
        if (item.isArray()) {
            item.forEach(function (innerItem) {
                if (innerItem.isArray) {
                    return makeFlat(innerItem, newArray);
                } else {
                    newArray.push(innerItem);
                    return newArray;
                }
            });
        } else {
            newArray.push(item);
            return newArray;
        }

        return newArray;
    }

    return makeFlat(this, []);
});

Array.method("forEachBreakable", function (func, t) {
    "use strict";
    return Array.forEachBreakable(this, func, t);
});

Array.method('isArray', function () {
    return arrayHelper.isArray(this);
});

Array.method('print', function () {
    'use strict';
    var length = this.length;
    var i = 0;
    if (length === 0) {
        console.log("Empty Array");
    } else {
        do {
            console.log(this[i]);
        } while (++i < length);
    }
});

Array.method('push', function () {
    return this.splice.apply(
        this,
        [this.length, 0].concat(Array.prototype.splice.apply(arguments))
    );
    return this.length;
});

Array.method('reduce', function (func, value) {
    for (var i = 0; i < this.length; i += 1) {
        value = func(this[i], value);
    }
    return value;
});

Array.method('shift', function () {
    return this.splice(0, 1)[0];
});

Array.method('splice', function (_start, _deleteCount) {
    var oldLength = this.length;
    var max = Math.max;
    var min = Math.min;

    var start = recalcStart(_start, oldLength);
    var deleteCount = recalcDeleteCount(start, _deleteCount);
    var removedElements = removeElements(this, start, deleteCount);

    var insertCount = max(arguments.length - 2, 0);
    var delta = insertCount - deleteCount;
    shiftElements(this, start, delta);
    insertElements(this, arguments, start, insertCount);

    return removedElements;

    // helper methods ---------------------------------

    function recalcStart(_start, oldLength) {
        var start = _start || 0;
        if (start < 0) {
            start += oldLength;
        }
        return max(min(start, oldLength), 0);
    }

    function recalcDeleteCount(start, _deleteCount) {
        var deleteCount = typeof _deleteCount === 'number' ?
            _deleteCount :
            oldLength;
        return max(min(deleteCount, oldLength - start), 0);
    }

    function removeElements(array, start, deleteCount) {
        var result = [];
        for (var i = 0; i < deleteCount; i++) {
            var element = array[start + i];
            if (element !== undefined) {
                result[i] = element;
            }
        }
        return result;
    }

    function shiftElements(array, start, delta) {
        var shiftCount = oldLength - start - deleteCount;
        var newLength = oldLength + delta;

        var positiveDelta = delta < 0;
        var loopStart = positiveDelta ? start + insertCount : 1;
        for (var j = loopStart; shiftCount; j++, shiftCount--) {
            var newIndex = positiveDelta ? j : newLength - j;
            var oldIndex = positiveDelta ? j - delta : oldLength - j;
            array[newIndex] = array[oldIndex];
        }
        console.log('shift', array);
    }

    function insertElements(array, args, start, insertCount) {
        for (var k = 0; k < insertCount; k++) {
            array[start + k] = args[k + 2];
        }
        console.log('insert', array);
    }

});

Array.method('unshift', function () {
    this.splice.apply(
        this,
        [0, 0].concat(Array.prototype.slice.apply(arguments))
    );
    return this.length;
});

// Static --------------------------------------------

Array.borrowFromPrototype = Array.borrowFromPrototype || function (methodName, array, arg1, arg3) {
        'use strict';
        return Array.prototype[methodName].call(array, arg1, arg2);
    };

Array.dim = Array.dim || function (dimension, initial) {
        var array = [];
        for (var i = 0; i < dimension; i++) {
            array[i] = initial;
        }
        return array;
    };

Array.forEachBreakable = Array.forEachBreakable || function (array, func, t) {
        "use strict";
        try {
            array.forEach(func, t);
        }
        catch (e) {
            if (e === Array.forEachBreakable.break) {
                return;
            } else {
                throw e;
            }
        }
    };
Array.forEachBreakable.break = new Error('StopIteration');

Array.identity = Array.identity || function (n) {
        var matrix = Array.matrix(n, n, 0);
        for (var i = 0; i < n; i++) {
            matrix[i][i] = 1;
        }
        return matrix;
    };

Array.join = Array.join || function (array, separator) {
        return Array.borrowFromPrototype('join', array, separator);
    };

Array.map = Array.map || function (array, func, thisArg) {
        return Array.borrowFromPrototype('map', array, func, thisArg);
    };

Array.matrix = Array.matrix || function (m, n, initial) {
        var matrix = [];
        for (var i = 0; i < m; i++) {
            var innerArray = [];
            for (var j = 0; j < n; j++) {
                innerArray[j] = initial;
            }
            matrix[i] = innerArray;
        }

        return matrix;
    };

Array.slice = Array.slice || function (array, from, to) {
        return Array.borrowFromPrototype('slice', array, from, to);
    };
