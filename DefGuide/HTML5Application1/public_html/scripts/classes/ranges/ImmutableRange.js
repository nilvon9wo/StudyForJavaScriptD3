function ImmutableRange(from, to){
    this.from = from;
    this.to = to;
    
    Object.freezeProperties(this);
}

ImmutableRange.extendPrototype(Object.hideProperties({
    constructor: ImmutableRange,
    forEach: function(func){
        for (var x = Math.ceil(this.from); x <= this.to; x++){
            func(x);
        }
    },
    includes: function(x){
        return this.from <= x && x <= this.to;
    },
    toString: function(){
        return '(' + this.from + '...' + this.to + ')';
    }
}));