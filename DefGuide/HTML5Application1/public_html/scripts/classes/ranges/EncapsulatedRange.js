function EncapsulatedRange(from, to){
    function RangeProperty(get, set){
        this.get = get;
        this.set = set;
        this.enumerable = false;
        this.configurable = false;
    }
    
    if (from > to){
        throw new Error ('Range: from must be <= to');
    }
    
    function getFrom(){
        return from;
    }
    function getTo(){
        return to;
    }
    function setFrom(newFrom){
        if (newFrom <= to){
            from = newFrom;
        }
    }
    function setTo(newTo){
        if (newTo >= from){
            to = newTo;
        }
    }
    
    Object.defineProperties(this, {
        from: new RangeProperty(getFrom, setFrom),
        to: new RangeProperty(getTo, setTo)
    });
}

EncapsulatedRange.extendPrototype(Object.hideProperties({
    constructor: EncapsulatedRange,
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