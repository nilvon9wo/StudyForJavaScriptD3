/* global AbstractHelper, AbstractEnumerableSet, AbstractWritableSet */

var ArraySet = (function () {
    var constructor = function ArraySet() {
        this.values = [];
        this.add.apply(this, arguments);
    };

    var methods = {
        add: function () {
            var self = this;
            arguments.toArray().forEach(function (arg) {
                if (!self.contains(arg)) {
                    self.values.push(arg);
                }
            });
            return this;
        },
        contains: function (value) {
            return this.values.indexOf(value) !== -1;
        },
        forEach: function (func, context) {
            this.values.forEach(func, context);
        },
        remove: function () {
            var self = this;
            arguments.toArray().forEach(function (arg) {
                var property = self.values.indexOf(arg);
                if (property !== -1) {
                    self.values.splice(property, 1);
                }
            });
            return this;
        },
        size: function () {
            return this.values.length;
        }
    };

    return AbstractWritableSet.defineSubclass(constructor, methods);
}());
