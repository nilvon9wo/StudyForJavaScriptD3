var DefGuideMath = {
    absolute: function (x) {
        'use strict';
        return (x >= 0) ? x : -x;
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

    hypotenuse: function(x, y){
        'use strict';
        return Math.sqrt(x * x + y * y);
    },

    max: function(array){
        'use strict';
        array.reduce(function(x, y){ return x > y ? x : y });
    },
    
    plus1: function (x) {
        'use strict';
        return x + 1;
    },

    product: function(array){
        'use strict';
        array.reduce(function(x, y){ return x * y }, 1);
    },
    
    square: function (x) {
        "use strict";
        return x * x;
    },

    sum: function(array){
        'use strict';
        array.reduce(function(x, y){ return x + y }, 0);
    }
};
