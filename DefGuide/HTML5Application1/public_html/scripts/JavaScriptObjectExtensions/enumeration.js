function enumeration(namesToValues){
    var enumeration = function(){
        throw new Error ('Can\'t Instantiate Enumerations');
    };
    
    enumeration.extendPrototype({
        constructor: enumeration,
        toString: function(){
            return this.name;
        },
        valueOf: function(){
            return this.value;
        },
        toJSON: function(){
            return this.name;
        }
    });
    
    var proto = enumeration.prototype;
    enumeration.values = [];
    
    for (var name in namesToValues){
        var _enum = Object.inherit(proto);
        _enum.name = name;
        _enum.value = namesToValues[name];
        enumeration[name] = _enum;
        enumeration.values.push(_enum);
    }
    
    enumeration.forEach = function(func, context){
        enumeration.values.forEachOwnProperty(function(value){
            func.call(context, value);
        });
    };
    
    Object.freeze(enumeration.values);
    Object.freeze(enumeration);
    return enumeration;
}