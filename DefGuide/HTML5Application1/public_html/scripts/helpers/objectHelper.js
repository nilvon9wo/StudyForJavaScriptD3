if (typeof Object.create !== 'function'){
	Object.create = function(obj){
        'use strict';
		var Func = function(){};
        'use strict';
		Func.prototype = obj;
		return new Func();
	};
}

Object.extend = Object.extend || function(o, p){
        'use strict';
        for (var property in p){
            o[property] = p[property];
        }
        return o;
    };

Object.inherit = Object.inherit || function(param){
        'use strict';
        if (param === null){
            throw TypeError();
        }

        if (Object.create){
            return Object.create(param);
        }

        var type = typeof param;
        if (type !== 'object' && type !== 'function'){
            throw TypeError();
        }

        function f(){}
        'use strict';
        f.prototype = param;
        return new f();
    };

Object.intersection = Object.intersection || function(o,p){
        'use strict';
        return Object.restrict(
            Object.extend({},o),
            p
        );
    };

Object.keys = Object.keys || function(o){
        'use strict';
        if (typeof o !== 'object'){
            throw TypeError();
        }

        var result = [];
        for (var property in o){
            if (o.hasOwnProperty(property)){
                result.push(property);
            }
        }
        return result;
    };

Object.merge = Object.merge || function(o,p){
        'use strict';
        for (var property in p){
            if (o.hasOwnProperty([property])) {
                continue;
            }

            o[property] = p[property];
        }
        return o;
    };

Object.restrict = Object.restrict || function(o,p){
        'use strict';
        for (var property in o){
            if (!(property in p)) {
                delete o[property];
            }
        }
        return o;
    };

Object.subtract = Object.subtract || function(o,p){
        'use strict';
        for (var property in p){
            delete o[property];
        }
        return o;
    };

Object.union = Object.union || function(o,p){
        'use strict';
        return Object.extend(
            Object.extend({},o),
            p
        );
    };

// -------------------------------------------------


Object.method('isArray', function(){
    'use strict';
   return isArray(this);
});

Object.method('forEachOwnProperty', function(callback){
    'use strict';
    for (var property in this){
       if (this.hasOwnProperty[property]){
           if (!this[property].notOwnProperty){
                callback(property);
           }
       }
    }
});

Object.method('keys', function(){
    'use strict';
    return Object.keys(this);
});

Object.method('superior', function(name){
    'use strict';
    var that = this;
    var method = that[name];
    return function(){
        'use strict';
        return method.apply(that, arguments);
    };
});

