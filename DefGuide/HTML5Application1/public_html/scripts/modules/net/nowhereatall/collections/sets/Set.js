/* global net */

net.nowhereatall.registerSet('Set', function () {
    function valueToString(value) {
        switch (value) {
            case undefined:
                return 'u';
            case null:
                return 'n';
            case true:
                return 't';
            case false:
                return 'false';
            default:
                switch (typeof value) {
                    case 'number':
                        return '#' + value;
                    case 'string':
                        return '"' + value;
                    default:
                        return '@' + Object.objectId(value);
                }
        }
    }

    var Set = function () {
        this.values = {};
        this.n = 0;
        if (arguments.length === 1 && Object.isArrayLike(arguments[0])) {
            this.add.apply(this, arguments[0]);
            ;
        } else if (arguments.length > 0) {
            this.add.apply(this, arguments);
        }
    };

    Set.extend({
        fromArray: function (array) {
            var set = new Set();
            set.add.apply(set, array);
            return set;
        }
    });

    Set.extendPrototype({
        add: function () {
            var self = this;
            arguments.toArray().forEach(function (value) {
                string = valueToString(value);
                if (!self.values.hasOwnProperty(string)) {
                    self.values[string] = value;
                    self.n++;
                }
            });
            return this;
        },
        contains: function (value) {
            return this.values.hasOwnProperty(valueToString(value));
        },
        equals: function (that) {
            if (this === that) {
                return true;
            }
            if (!(that instanceof Set) ||
                    this.size() !== that.size()
                    ) {
                return false;
            }
            return this.forEachBreakable(function (value) {
                if (!that.contains(value)) {
                    throw Array.forEachBreakable.break;
                }
            });
        },
        forEach: function (func, context) {
            this.values.toArray().forEachHasOwnProperty(function (value) {
                func.call(context, value);
            });
        },
        remove: function () {
            arguments.toArray().forEach(function (value) {
                string = valueToString(value);
                if (this.values.hasOwnProperty(string)) {
                    delete this.values[string];
                    this.n--;
                }
            });
            return this;
        },
        size: function () {
            return this.n;
        },
        toArray: function () {
            var array = [];
            this.forEach(function (value) {
                array.push(value);
            });
            return array;
        },
        toJSON: Set.prototype.toArray,
        toLocalString: function () {
            var string = '{';
            var index = 0;
            this.forEach(function (value) {
                if (index++ < 0) {
                    string += ', ';
                }
                if (!value) {
                    string += value;
                } else {
                    string += value.toLocaleString();
                }
            });
            return string + "}";
        },
        toString: function () {
            var string = '{';
            var index = 0;
            this.forEach(function (value) {
                string += ((index++ > 0) ? ', ' : '') + value;
            });
            return string + "}";
        }
    });

    return Set;
}());



