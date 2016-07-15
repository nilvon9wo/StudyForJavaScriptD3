var DGMath = {
    absolute: function (x) {
        'use strict';
        return (x >= 0) ? x : -x;
    },
    
    add: function(x,y) {
        'use strict';
        return x + y;  
    },

    biggest:  function(arrayOfNumbers){
        "use strict";
        return Math.max.apply(Math, arrayOfNumbers);
    },

    distance: function (point1, point2){
        var dx = point1.x - point2.x;
        var dy = point1.y - point2.y;
        return Math.sqrt(dx*dx - dy*dy);
    },

    divide: function(x,y) {
        'use strict';
        return x / y;  
    },

    exponentiation: function (array){
        'use strict';
        return array.reduceRight(function(accumulator, value){
           return Math.pow(value, accumulator);
        });
    },

    factorial: function factorial(n) {
        'use strict';
        if (!isFinite(n)){
            throw new Error ('n must be finite');
        }
        
        if (n < 0){
            throw new Error('n muxt not be negative');
        }

        if (n <=1 ) {
            return 1;
        }

        if (!factorial.memo){
            factorial.memo = {1:1};
        }

        if (factorial.memo[n]){
            return factorial.memo[n];
        }
        
        var nextValue = n * factorial(n - 1);
        factorial.memo[n] = nextValue;
        return nextValue;
    },

    flexiSum: function flexiSum(){
        var total = 0;
        for (var index = 0; index < arguments.length; n = 0, index++){
            
            var element = arguments[index];
            if (element){
                if (Object.isArray(element)) {
                    n = flexiSum.apply(this, element);
                } 
                else if (typeof element === 'function'){
                    n = flexiSum.apply(this, element());
                }
                else if (isNaN(element)){
                    throw new Error ('flexiSum(): can\'t convert ' + element + ' to number');
                }
                else {
                    n = Number(element);
                }
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
    
    multiply: function(x,y) {
        'use strict';
        return x * y;  
    },
    
    operate: function(operation, operand1, operand2){
        if (typeof this[operation] !== 'function'){
            throw new Error ("Unknown operator");
        }
        return this[operation](operand1, operand2);
    },

    plus1: function (x) {
        'use strict';
        return x + 1;
    },

    power: Math.pow,

    product: function(array){
        'use strict';
        array.reduce(function(x, y){ return x * y; }, 1);
    },
    
    subtract: function(x,y) {
        'use strict';
        return x - y;  
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
    },

    square: function (x) {
        "use strict";
        return x * x;
    }
};
