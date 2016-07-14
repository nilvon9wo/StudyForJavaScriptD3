if (typeof Object.create !== 'function') {
    Object.create = function (obj) {
        'use strict';
        var Func = function () {
        };
        'use strict';
        Func.prototype = obj;
        return new Func();
    };
}

Object.defineProperty(Object.prototype, 'extend', {
    writable: true,
    enumerable: false,
    configurable: true,
    value: function (o) {
        var names = Object.getOwnPropertyNames(o);
        names.forEach(function (name) {
            if (!(name in this)) {
                var desc = Object.getOwnPropertyDescriptor(o, name);
                Object.defineProperty(this.name, desc);
            }
        });
    }

});

Object.classOf = Object.classOf || function (obj) {
        'use strict';
        if (obj === null) {
            return 'Null';
        }

        if (obj === undefined) {
            return 'Undefined';
        }

        return Object.prototype.toString.call(obj).slice(8, -1);
    };

Object.getPropertyNames = Object.getPropertyNames || function (obj, targetArray) {
        'use strict';
        if (typeof obj !== 'object') {
            throw TypeError();
        }

        var result = (targetArray && targetArray.isArray()) || [];
        for (var property in obj) {
            if (obj.hasOwnProperty(property)) {
                result.push(property);
            }
        }
        return result;
    };

Object.inherit = Object.inherit || function (param) {
        'use strict';
        if (param === null) {
            throw TypeError();
        }

        if (Object.create) {
            return Object.create(param);
        }

        var type = typeof param;
        if (type !== 'object' && type !== 'function') {
            throw TypeError();
        }

        function f() {
        }

        'use strict';
        f.prototype = param;
        return new f();
    };

Object.intersection = Object.intersection || function (o, p) {
        'use strict';
        return Object.restrict(
            Object.extend({}, o),
            p
        );
    };



Object.isArrayLike = Object.isArrayLike || function (obj) {
    'use strict';
    return (obj &&
        typeof obj === 'object' &&
        isFinite(obj.length) &&
        obj.length >= 0 &&
        obj.length === Math.floor(obj.length) &&
        obj.length < 4294967296
    );
};

Object.merge = Object.merge || function (o, p) {
        'use strict';
        for (var property in p) {
            if (o.hasOwnProperty([property])) {
                continue;
            }

            o[property] = p[property];
        }
        return o;
    };

Object.restrict = Object.restrict || function (o, p) {
        'use strict';
        for (var property in o) {
            if (!(property in p)) {
                delete o[property];
            }
        }
        return o;
    };

Object.subtract = Object.subtract || function (o, p) {
        'use strict';
        for (var property in p) {
            delete o[property];
        }
        return o;
    };

Object.union = Object.union || function (o, p) {
        'use strict';
        return Object.extend(
            Object.extend({}, o),
            p
        );
    };

// -------------------------------------------------


Object.method('isArray', function () {
    'use strict';
    return Object.isArray(this);
});

Object.method('isArrayLike', function () {
    'use strict';
    return Object.isArrayLike(this);
});

Object.method('forEachOwnProperty', function (callback) {
    'use strict';
    for (var property in this) {
        if (this.hasOwnProperty[property]) {
            callback(property);
        }
    }
});

Object.method('getClass', function(){
    'use strict';
    return Object.classOf(this);
});

Object.method('getPropertyNames', function () {
    'use strict';
    return Object.getPropertyNames(this);
});

Object.method('logProperty', function(property){
    'use strict';
    console.log(property + ': ' + this[property] + '\n');
});

Object.method('logProperties', function(includeAll){
    'use strict';
    var method = includeAll ? 'forEach' : 'forEachOwnProperty';
    this[method](this.printProperty);
});

Object.method('superior', function (name) {
    'use strict';
    var that = this;
    var method = that[name];
    return function () {
        return method.apply(that, arguments);
    };
});

