/* global AbstractHelper, AbstractEnumerableSet */

var AbstractWritableSet = (function () {
    var constructor = AbstractHelper.constructor();

    var methods = {
        add: AbstractHelper.method,
        difference: function (that) {
            var self = this;
            that.forEach(function (value) {
                self.remove(value);
            });
            return this;
        },
        intersection: function (that) {
            var self = this;
            that.forEach(function (value) {
                if (!that.contains(value)) {
                    self.remove(value);
                }
            });
            return this;
        },
        remove: AbstractHelper.method,
        union: function (that) {
            var self = this;
            that.forEach(function (value) {
                self.add(value);
            });
            return this;
        }
    };

    return AbstractEnumerableSet.defineSubclass(constructor, methods);
}());
