/* global Function */

Function.check = Function.check || function(args){
    var actual = args.length;
    var expected = args.callee.length;
    if (actual !== expected){
        throw new Error ('Expected' + expected + 'args; got ' + actual);
    }
};

Function.operate = Function.operate || function(operator, operand1, operand2){
    if (typeof operator !== 'function'){
        throw new Error ('operator must be a function');
    }
    return operator(operand1, operand2);
};

Function.prototype.method = function (name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        Object.defineProperty(this.prototype, name, {enumerable: false});
        return this;
    }
};

Function.method('bind', function (obj) {
    var self = this;
    var boundArgs = arguments;

    return function(){
        'use strict';
        var args = [];
        for (var i = 1; i < boundArgs.length; i++){
            args.push(boundArgs[i]);
        }
        for (var i = 0; i < arguments.length; i++){
            args.push(arguments[i]);
        }

        return self.apply(o, args);
    }
});

Function.method('curry', function () {
    var args = arguments.toArray();
    var that = this;
    return function () {
        var concatArgs = args.concat(arguments.toArray());
        return that.apply(null, concatArgs);
    };
});

Function.method('inherits', function (Parent) {
    this.prototype = new Parent();
    return this;
});

Function.method('new', function () {
    var that = Object.create(this.prototype);
    var other = this.apply(that, arguments);
    return (typeof other === 'object' && other) || that;
});

