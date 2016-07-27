/* global arrayHelper */

Array.extend({
    borrowFromPrototype: function (methodName, array, arg1, arg2) {
        'use strict';
        return Array.prototype[methodName].call(array, arg1, arg2);
    },
    compareBy: function (name, minor) {
        'use strict';
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
        'use strict';
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
    copy: function (from, fromStart, to, toStart, length) {
        if (length < 0) {
            throw new Error("Length must be a positive number");
        }

        if (!from || fromStart > from.length - 1) {
            return [];
        }

        var result = to || [];
        var toIndex = toStart;
        for (var fromIndex = fromStart; result.length < length || fromIndex > from.length - 1; fromIndex++) {
            if (from[fromIndex]) {
                result[toIndex] = from[fromIndex];
                toIndex++;
            }
        }

        return result;
    },
    easyCopy: function (args) {
        return Array.copy(
                args.from,
                args.fromStart || 0,
                args.to,
                args.toStart || 0,
                args.length
                );
    },
    dim: function (dimension, initial) {
        var array = [];
        for (var i = 0; i < dimension; i++) {
            array[i] = initial;
        }
        return array;
    },
    forEachBreakable: function (array, func, t) {
        "use strict";
        try {
            array.forEach(func, t);
            return Array.forEachBreakable.COMPLETED;
        } catch (e) {
            if (e === Array.forEachBreakable.break) {
                return Array.forEachBreakable.BROKEN;
            } else {
                throw e;
            }
        }
    },
    identity: function (n) {
        var matrix = Array.matrix(n, n, 0);
        for (var i = 0; i < n; i++) {
            matrix[i][i] = 1;
        }
        return matrix;
    },
    join: function (array, separator) {
        return Array.borrowFromPrototype('join', array, separator);
    },
    map: function (array, func, thisArg) {
        return Array.borrowFromPrototype('map', array, func, thisArg);
    },
    mapper: function (func) {
        'use strict';
        return function (array) {
            return array.map(func);
        };
    },
    matrix: function (m, n, initial) {
        var matrix = [];
        for (var i = 0; i < m; i++) {
            var innerArray = [];
            for (var j = 0; j < n; j++) {
                innerArray[j] = initial;
            }
            matrix[i] = innerArray;
        }

        return matrix;
    },
    originalSort: Array.prototype.sort,
    slice: function (array, from, to) {
        return Array.borrowFromPrototype('slice', array, from, to);
    }
});
Array.forEachBreakable.break = new Error('StopIteration');
Array.forEachBreakable.BROKEN = false;
Array.forEachBreakable.COMPLETED = true;

Array.extendPrototype({
    areEqualArrays: function (a, b) {
        'use strict';
        if (a.length !== b.length) {
            return false;
        }

        try {
            a.forEach(function (element, index) {
                if (element !== b[index]) {
                    throw Array.forEachBreakable.break;
                }
            });
        } catch (e) {
            return false;
        }
        return true;
    },
    closeGaps: function () {
        'use strict';
        return this.filter(function (x) {
            return x !== undefined && x !== null;
        });
    },
    findAllIndexes: function (x) {
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
    },
    flatten: function makeFlat() {
        'use strict';
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
    },
    forEachBreakable: function (func, t) {
        'use strict';
        return Array.forEachBreakable(this, func, t);
    },
    map: function (func) {
        var results = [];
        for (var index = 0, length = this.length; index < length; index++) {
            if (index in this) {
                if (func && typeof func === 'function'){
                results[index] = func.call(null, this[index], index, this);
                }
            }
        }
        return results;
    },
    print: function () {
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
    },
    push: function () {
        return this.splice.apply(
                this,
                [this.length, 0].concat(Array.prototype.splice.apply(arguments))
                );
        return this.length;
    },
    reduce: function reduce(func, initial) {
        var index = 0;
        var length = this.length;
        var accumulator;

        if (arguments.length > 1) {
            accumulator = initial;
        } else {
            if (length === 0) {
                throw new TypeError;
            }

            while (index < length) {
                if (index in this) {
                    accumulator = this[index++];
                    break
                } else
                    index++;
            }
            if (index === length) {
                throw TypeError();
            }
        }

        while (index < length) {
            if (index in this) {
                accumulator = func.call(undefined, accumulator, this.index, index, this);
            }
            index++;
        }

        return accumulator;
    },
    shift: function () {
        return this.splice(0, 1)[0];
    },
    sort: function () {
        var start = new Date();
        Array.originalSort.apply(this, arguments);
        var end = new Date();
        console.warn('Array sort took ' + (end - start) + 'milliseconds');
    },
    splice: function (_start, _deleteCount) {
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
        }

        function insertElements(array, args, start, insertCount) {
            for (var k = 0; k < insertCount; k++) {
                array[start + k] = args[k + 2];
            }
        }
    },
    unshift: function () {
        this.splice.apply(
                this,
                [0, 0].concat(Array.prototype.slice.apply(arguments))
                );
        return this.length;
    }
});



