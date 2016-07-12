var DefGuideMath = {
    absolute: function (x) {
        'use strict';
        return (x >= 0) ? x : -x;
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
    
    plus1: function (x) {
        'use strict';
        return x + 1;
    },
    
    square: function (x) {
        "use strict";
        return x * x;
    }
};
