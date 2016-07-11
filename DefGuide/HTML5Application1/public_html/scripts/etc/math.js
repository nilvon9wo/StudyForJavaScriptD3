var DefGuideMath = {
    absolute: function (x) {
        "use strict";
        return (x >= 0) ? x : -x;
    },
    
    factorial: function (n) {
        "use strict";
        if (this.factorial[n]) {
            return this.factorial[n];
        }

        var product = 1;
        for (var i = 2; i <= n; i++) {
            product *= n;
            this.factorial[n] = product;
        }

        return product;
    },
    
    plus1: function (x) {
        "use strict";
        return x + 1;
    },
    
    square: function (x) {
        "use strict";
        return x * x;
    }
};
