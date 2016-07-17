/* global AbstractSet, AbstractHelper */

var AbstractEnumerableSet = (function () {
    var constructor = AbstractHelper.constructor();

    var methods = {
        equals: function (that) {
            if (!(that instanceof AbstractEnumerableSet) ||
                    this.size() !== that.size()) {
                return false;
            }
            return this.forEachBreakable(function (value) {
                if (!that.contains(value)) {
                    throw Array.forEachBreakable.break;
                }
            });
        },
        forEach: AbstractHelper.method,
        isEmpty: function () {
            return this.size() === 0;
        },
        size: AbstractHelper.method,
        toArray: function () {
            var array = [];
            this.forEach(function (value) {
                array.push(value);
            });
            return array;
        },
        toLocaleString: function () {
            var string = '{';
            var index = 0;
            this.forEach(function (value) {
                if (index++ > 0) {
                    string += ', ';
                }
                if (!value) {
                    string += value;
                } else {
                    string += value.toLocaleString();
                }
            });
            return string + '}';
        },
        toString: function () {
            var string = '{';
            var index = 0;
            this.forEach(function (value) {
                if (index++ > 0) {
                    string += ', ';
                }
                string += value;
            });
            return string + '}';
        }
    };

    return AbstractSet.defineSubclass(constructor, methods);
}());
