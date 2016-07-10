/* global Function */

Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        this.prototype[name].notOwnProperty = true;
        return this;
    }
};

Object.method('toArray', function () {
    return Array.prototype.slice.call(this);
});

Function.method('bind', function (that) {
    var method = this;
    var slice = Array.prototype.slice;
    var args = slice.apply(arguments, [1]);

    return function () {
        return method.apply(
                that,
                args.concat(slice.apply(arguments, [0]))
                );
    };
});

Function.method('curry', function () {
    var args = arguments.toArray();
    var that = this;
    return function () {
        var concatArgs = args.concat(arguments.toArray());
        return that.apply(null, concatArgs);
    };
});

Function.method('new', function () {
    var that = Object.create(this.prototype);
    var other = this.apply(that, arguments);
    return (typeof other === 'object' && other) || that;
});

Function.method('inherits', function (Parent) {
    this.prototype = new Parent();
    return this;
});