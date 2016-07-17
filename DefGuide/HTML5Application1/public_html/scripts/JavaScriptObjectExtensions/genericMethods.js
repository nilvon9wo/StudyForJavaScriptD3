/* global Set */

var genericMethods = {
    equals: function (that) {
        if (
                !that ||
                this.constructor !== that.constructor
                ) {
            return false;
        }
        for (var name in this) {
            if (
                    this.hasOwnProperty(name) &&
                    name !== Set.OBJECT_ID &&
                    this[name] !== that[name]
                    ) {
                return false;
            }
            return true;
        }
    },
    toString: function () {
        var string = '[';
        if (this.constructor && this.constructor.name) {
            string += this.constructor.name + ': ';
        }

        var n = 0;
        this.toArray().forEachHasOwnProperty(function (property) {
            var value = this[property];
            if (typeof value !== 'function') {
                if (n++) {
                    string += ', ';
                }
                string += property + '=' + value;
            }
        });
        return string + ']';
    }
};