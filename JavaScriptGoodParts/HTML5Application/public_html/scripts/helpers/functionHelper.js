/* global Function */

Function.prototype.method = function(name, func){
	if (!this.prototype[name]) {
		this.prototype[name] = func;
		return this;
	} 
};

Object.prototype.toArray = function(){
    return Array.prototype.slice.call(this);
};

Function.method('curry', function(){
   var args = arguments.toArray();
   var that = this;
   return function(){
       var concatArgs = args.concat(arguments.toArray());
       return that.apply(null, concatArgs);
   };
});

Function.method('new', function(){
    var that = Object.create(this.prototype);
    var other = this.apply(that, arguments);
    return (typeof other === 'object' && other) || that;
});

Function.method('inherits', function(Parent){
    this.prototype = new Parent();
    return this;
});