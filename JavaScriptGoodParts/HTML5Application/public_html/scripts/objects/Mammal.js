var Mammal = function(name){
    this.name = name;
};
Mammal.prototype = {
    getName : function(){
        return this.name;
    },
    says : function(){
        return this.saying || '';
    }
};

var mammal_pseudoclassical = new Mammal('Herb the Mammal');
var name = mammal_pseudoclassical.getName();

var mammal_prototypal = {
    name:'Herb the Mammal',
    getName: function() {
        return this.name;
    },
    says: function(){
        return this.saying || '';
    }
};

var mammal_functional = function(spec){
    var that = {};
    that.getName = function(){
        return spec.name;
    };
    that.says = function(){
        return spec.saying || '';
    };
    return that;
};

