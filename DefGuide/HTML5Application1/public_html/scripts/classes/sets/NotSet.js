/* global AbstractSet */

var NotSet = (function () {
    var constructor = function NotSet(set) {
        this.set = set;
    };

    var methods = {
        contains: function (x) {
            return !this.set.contains(x);
        },
        equals: function (that) {
            return that instanceof NotSet &&
                    this.set.equals(that.set);
        },
        toString: function (x) {
            return '~' + this.set.toString();
        }
    };

    return AbstractSet.defineSubclass(constructor, methods);
}());
