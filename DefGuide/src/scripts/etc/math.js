function plus1(x) {
    "use strict";
    return x + 1;
}

function square(x) {
    "use strict";
    return x * x;
}

function absolute(x) {
    "use strict";
    return (x >= 0) ? x : -x;
}

function factorial(n){
    "use strict";
    if (factorial[n]){
        return factorial[n];
    }

    var product = 1;
    for (var i = 2; i <= n; i++){
        product *= n;
        factorial[n] = product;
    }

    return product;
}



