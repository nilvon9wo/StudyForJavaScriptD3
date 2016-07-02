var add = function(a,b){
    b = b || 0;
    if (typeof a !== 'number' || typeof b !== 'number'){
        throw {
                name: 'TypeError',
                message: 'add needs numbers'
        };
    }
    return a+b;
};

var add1 = add.curry(1);

var sum = function(){
    var args = arguments.toArray().flatten();
    return args.reduce(add, 0);
};


var multiply = function(a, b){
    return a * b;
};

var product = function(){
    return arguments.toArray().reduce(multiply, 1);
};

var factorial = memoizer([1,1], function(shell, n){
    return n * shell(n-1);
});

var fibonacci = memoizer([0,1], function(shell, n){
    return shell(n-1) + shell(n-2);
});