/* global Function */

Function.check = Function.check || function (args) {
    'use strict';
    var actual = args.length;
    var expected = args.callee.length;
    if (actual !== expected) {
        throw new Error('Expected' + expected + 'args; got ' + actual);
    }
};

Function.compose = Function.compose || function(f, g){
    'use strict';
    return function(){
      return f.call(this, g.apply(this, arguments));
    };
};

Function.memoize = Function.memoize || function(func) {
  var cache = {};
  return function() {
    var key = arguments.length + Array.prototype.join.call(arguments, ',');
    if (key in cache){
        return cache[key];
    }
    else {
        return cache[key] = func.apply(this, arguments);
    }
  };
};

Function.operate = Function.operate || function (operator, operand1, operand2) {
    'use strict';
    if (typeof operator !== 'function') {
        throw new Error('operator must be a function');
    }
    return operator(operand1, operand2);
};

Function.partial = Function.partial || function (func) {
    'use strict';
    var outerArgs = arguments;
    return function () {
        var array = outerArgs.toArray(1);
        for (var i = 0, j = 0; i < array.length; i++) {
            if (array[i] === undefined) {
                array[i] = arguments[j++];
            }
        }
        var appliedArgs = array.concat(arguments.toArray(j));
        return func.apply(this, appliedArgs);
    };
};

Function.partialLeft = Function.partialLeft || function (func) {
    'use strict';
    var outerArgs = arguments;
    return function () {
        var appliedArgs = outerArgs.toArray(1).concat(arguments.toArray());
        return func.apply(this, appliedArgs);
    };
};

Function.partialRight = Function.partialRight || function (func) {
    'use strict';
    var outerArgs = arguments;
    return function () {
        var appliedArgs = outerArgs.toArray().concat(toArray(1));
        return func.apply(this, appliedArgs);
    };
};


Function.prototype.method = function (name, func) {
    'use strict';
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        Object.defineProperty(this.prototype, name, {enumerable: false});
        return this;
    }
};

Function.method('bind', function (obj) {
    'use strict';
    var self = this;
    var boundArgs = arguments;

    return function () {
        var args = [];
        for (var i = 1; i < boundArgs.length; i++) {
            args.push(boundArgs[i]);
        }
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        return self.apply(obj, args);
    };
});

Function.method('curry', function () {
    'use strict';
    var args = arguments.toArray();
    var that = this;
    return function () {
        var concatArgs = args.concat(arguments.toArray());
        return that.apply(null, concatArgs);
    };
});

Function.method('inherits', function (Parent) {
    'use strict';
    this.prototype = new Parent();
    return this;
});

Function.method('new', function () {
    'use strict';
    var that = Object.create(this.prototype);
    var other = this.apply(that, arguments);
    return (typeof other === 'object' && other) || that;
});

