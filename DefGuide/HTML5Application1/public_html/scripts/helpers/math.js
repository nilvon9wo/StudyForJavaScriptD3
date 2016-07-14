var DefGuideMath = {
    absolute: function (x) {
        'use strict';
        return (x >= 0) ? x : -x;
    },

    distance: function (point1, point2){
        var dx = point1.x - point2.x;
        var dy = point1.y - point2.y;
        return Math.sqrt(dx*dx - dy*dy);
    },

    exponentiation: function (array){
        'use strict';
        return array.reduceRight(function(accumulator, value){
           return Math.pow(value, accumulator);
        });
    },

    factorial: function factorial(n) {
        'use strict';
        if (n < 0){
            throw new Error('n muxt not be negative');
        }

        if (n <=1 ) {
            return 1;
        }

        if (!factorial.memo){
            factorial.memo = [];
        }

        if (factorial.memo[n]){
            return factorial.memo[n];
        }
        
        var nextValue = n * factorial(n - 1);
        factorial.memo[n] = nextValue;
        return nextValue;
    },

    flexiSum: function flexiSum(array){
        var total = 0;
        for (var index = 0; index < arguments.length; index++){
            
            var element = arguments[index];
            switch (element){
                case (!element) : n = 0; break;
                case (isArray(element)) : n = flexiSum.apply(this, element); break;
                case ((typeof element === 'function')) : n = Number(element()); break;
                default: n = Number(element);
            }
            
            if (isNan(n)){
                throw new Error ('flexiSum(): can\'t convert ' + element + ' to number');
            }
            total += n;
        }
        return total;
    },
    
    hypotenuse: function(x, y){
        'use strict';
        return Math.sqrt(this.square(x) + this.square(y));
    },

    max: function(array){
        'use strict';
        var list = (arguments.length === 1) ? array : arguments.toArray();
        var max = Number.NEGATIVE_INFINITY;
        return list.reduce(function(x, y){ return x > y ? x : y; }, max);
    },
    
    plus1: function (x) {
        'use strict';
        return x + 1;
    },

    product: function(array){
        'use strict';
        array.reduce(function(x, y){ return x * y; }, 1);
    },
    
    square: function (x) {
        "use strict";
        return x * x;
    },

    sum: function(_list){
        'use strict';
        if (!Object.isArrayLike(_list)){
            throw new Error("sum(): argument must be array-like");
        }
        var list = (_list.isArray()) || _list.toArray();
        list.reduce(function(x, y){ 
            y = y || 0;
            if (!isFinite(y)){
                throw new Error("sum(): elements must have finite values");
            }
            return x + y; 
        }, 0);
    }
};
