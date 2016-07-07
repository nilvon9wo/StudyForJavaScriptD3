if (typeof Object.create !== 'function'){
	Object.create = function(obj){
		var Func = function(){};
		Func.prototype = obj;
		return new Func();
	};
}

Object.method('isArray', function(){
   return isArray(this);
});


Object.method('forEachOwnProperty', function(callback){
    'use strict';
    for (var property in this){
       if (this.hasOwnProperty[property]){
           callback(property);
       }
    }
});

Object.method('superior', function(name){
    var that = this;
    var method = that[name];
    return function(){
        return method.apply(that, arguments);
    };
});
