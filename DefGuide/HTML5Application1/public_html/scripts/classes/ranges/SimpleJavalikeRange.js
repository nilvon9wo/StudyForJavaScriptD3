var SimpleJavalikeRange = (function () {
    var constructor = function (from, to) {
        this.from = from;
        this.to = to;
    };

    var methods = {
        includes: function (x) {
            return this.from <= x && x <= this.to;
        },
        toString: function () {
            return '(' + this.from + '...' + this.to + ')';
        }
    };

    var statics = {
        upTo : function(to){
            return new SimpleRange(0, to); 
        }
    };
    return Class.defineJavalikeClass(constructor, methods, statics);
}());
