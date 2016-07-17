/* global Set, Class */

var FilteredSet = (function () {
    var constructor = function FilteredSet(set, filter) {
        this.set = set;
        this.filter = filter;
    };

    var methods = {
        add: function () {
            if (this.filter) {
                for (var index = 0; index < arguments.length; index++) {
                    var value = arguments[index];
                    if (!this.filter(value)) {
                        throw new Error('FilteredSet: value ' + value + ' rejected by filter');
                    }
                }
            }

            this.set.add.apply(this.set, arguments);
            return this;
        },
        contains: function (value) {
            return this.set.contains(value);
        },
        forEach: function (func, context) {
            this.set.forEach(func, context);
        },
        return: function () {
            this.set.remove.apply(this.set, arguments);
            return this;
        },
        size: function () {
            return this.set.size();
        }
    };

    return Class.defineJavalikeClass(constructor, methods);
}());





        