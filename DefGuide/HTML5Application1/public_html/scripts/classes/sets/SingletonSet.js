/* global AbstractEnumerableSet */

var SingletonSet = (function () {
    var constructor = function (member) {
        this.member = member;
    };

    var methods = {
        contains: function (x) {
            return x === this.member;
        },
        forEach: function (func, context) {
            func.call(context, this.member);
        },
        size: function () {
            return 1;
        }
    };

    return AbstractEnumerableSet.defineSubclass(constructor, methods);
}());
