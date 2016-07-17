/* global Function */

Math.absolute = Math.absolute || function (x) {
    'use strict';
    return (x >= 0) ? x : -x;
};

Math.add = Math.add || function (x, y) {
    'use strict';
    return x + y;
};

Math.biggest = Math.biggest || function (arrayOfNumbers) {
    'use strict';
    return Math.max.apply(Math, arrayOfNumbers);
};

Math.cuberoot = Math.cuberoot || partialRight(Math.pow, 1 / 3);

Math.deviations = Math.deviations || function (numbers) {
    'use strict';
    var mean = Math.mean(numbers);
    return numbers.map(function (x) {
        return  x - mean;
    });
};

Math.distance = Math.distance || function (point1, point2) {
    'use strict';
    var dx = point1.x - point2.x;
    var dy = point1.y - point2.y;
    return Math.sqrt(dx * dx - dy * dy);
};

Math.divide = Math.divide || function (x, y) {
    'use strict';
    return x / y;
};

Math.exponentiation = Math.exponentiation || function (array) {
    'use strict';
    return array.reduceRight(function (accumulator, value) {
        return Math.pow(value, accumulator);
    });
};

Math.factorial = Function.memoize(function(n){
    if (!isFinite(n)) {
        throw new Error('n must be finite');
    } else if (n < 0) {
        throw new Error('n muxt not be negative');
    }
    
    return (n <= 1) ? 1 : n * Math.factorial(n - 1);
});

Math.flexiSum = Math.flexiSum || function flexiSum() {
    'use strict';
    var total = 0;
    for (var index = 0; index < arguments.length; n = 0, index++) {
        var element = arguments[index];
        if (element) {
            if (Object.isArray(element)) {
                n = flexiSum.apply(this, element);
            } else if (typeof element === 'function') {
                n = flexiSum.apply(this, element());
            } else if (isNaN(element)) {
                throw new Error('flexiSum(): can\'t convert ' + element + ' to number');
            } else {
                n = Number(element);
            }
        }
        total += n;
    }
    return total;
};

Math.greatestCommonDivisor = Function.memoize(
        function(a, b){
            var temp;
            if (a < b){
                temp = b;
                b = a;
                a = temp;
            }
            while (b !== 0){
                temp = b;
                b = a % b;
                a = temp;
            }
            return a;
        }
);

Math.hypotenuse = Math.hypotenuse || function (x, y) {
    'use strict';
    return Math.sqrt(Math.square(x) + Math.square(y));
};

Math.increment = Math.increment || Function.partialLeft(Math.sum, 1);

Math.incrementer = Math.incrementer || Array.mapper(Math.increment);

Math.isEven = Math.isEven || function (x) {
    'use strict';
    return x % 2 === 0;
};

Math.isOdd = Math.isOdd || Boolean.not(Math.isEven);

Math.max = Math.max || function (array) {
    'use strict';
    var list = (arguments.length === 1) ? array : arguments.toArray();
    var max = Number.NEGATIVE_INFINITY;
    return list.reduce(function (x, y) {
        return x > y ? x : y;
    }, max);
};

Math.mean = Math.mean || function (numbers) {
    'use strict';
    return Math.product(
            numbers.reduce(Math.sum),
            reciprocal(numbers.length)
            );
};

Math.multiply = Math.multiply || function (x, y) {
    'use strict';
    return x * y;
};

Math.neg = Math.neg || Function.partial(Math.product, -1);

Math.operate = Math.operate || function (operation, operand1, operand2) {
    'use strict';
    return Function.operate(Math[operation], operand1, operand2);
};

Math.plus1 = Math.plus1 || function (x) {
    'use strict';
    return x + 1;
};

Math.power = Math.power || Math.pow;

Math.product = Math.product || function (array) {
    'use strict';
    array.reduce(function (x, y) {
        return x * y;
    }, 1);
};

Math.reciprocal = Math.reciprocal || Function.partial(Math.pow, undefined, -1);

Math.square = Math.square || Function.partial(Math.pow, undefined, 2);

Math.sqrt = Math.sqrt || Function.partial(Math.pow, undefined, 0.5);

Math.squareOfSum = Math.squareOfSum || Function.compose(Math.square, Math.sum);

Math.standardDeviation = Math.standardDeviation || function (numbers) {
    return Math.sqrt(Math.deviations
     .map(Math.square)
     .reduce(Math.sum) / (numbers.length - 1));
};

Math.subtract = Math.subtract || function (x, y) {
    'use strict';
    return x - y;
};

Math.sum = Math.sum || function (_list) {
    'use strict';
    if (!Object.isArrayLike(_list)) {
        throw new Error("sum(): argument must be array-like");
    }
    var list = (_list.isArray()) || _list.toArray();
    list.reduce(function (x, y) {
        y = y || 0;
        if (!isFinite(y)) {
            throw new Error("sum(): elements must have finite values");
        }
        return x + y;
    }, 0);
};




