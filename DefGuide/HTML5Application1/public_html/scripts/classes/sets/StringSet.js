/* global Set, AbstractWritableSet */

function StringSet() {
    this.set = Object.create(null);
    this.n = 0;
    this.add.apply(this, arguments);
}

StringSet.prototype = Object.create(AbstractWritableSet.prototype, {
    constructor: {value: StringSet},
    add: {value: function () {
            arguments.toArray().forEach(function (arg) {
                if ((typeof arg === 'string') &&
                        !(arg in this.set)) {
                    this.set[arg] = true;
                    this.n++;
                }
            });
            return this;
        }},
    contains: {value: function (x) {
            return x in this.set;
        }},
    forEach: {value: function (func, context) {
            Object.keys(this.set).forEach(func, context);
        }},
    remove: {value: function () {
            arguments.toArray().forEach(function (arg) {
                if (arg in this.set) {
                    delete this.set[arg];
                    this.n--;
                }
            });
            return this;
        }},
    size: {value: function () {
            return this.n;
        }}
});
