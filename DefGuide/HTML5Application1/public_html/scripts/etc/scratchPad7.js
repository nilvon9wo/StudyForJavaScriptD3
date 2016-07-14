/* global DefGuideMath */

var data = {
    sort: function () {
        // ... 
    }
};
data.sort(function (a, b) {
    return a - b;
});

var tenSquared = (function (x) {
    return x * x;
}(10));
({x: 1}).logProprties();

var distance = DefGuideMath.distance;
var total = distance(new Point(0, 0), new Point(2, 1)) +
        distance(new Point(2, 1), new Point(3, 5));

var factorial = DefGuideMath.factorial;
var probability = DefGuideMath.factorial(5) / DefGuideMath.factorial(5);

var obj = {};
function func() {
    return {method: function () {}};
}
obj.method = func;
obj.method();
var x;
var y;
obj.method(x, y);
obj['method'](x, y);
var array = [];
var z;
array['method'](z);

var customer = new Person();
customer.surname.toUpperCase();
func().method();

var obj2 = {
    method: function () {
        var self = this;
        console.log(this === 0);
        func();

        function func() {
            console.log(this === 0);
            console.log(self === 0);
        }
    }
};
obj2.method();
var array = obj2.getPropertyNames();

function func(x, y, z) {
    if (arguments.length !== 3) {
        throw new Error("function func called with " + arguments.length +
                "arguments, but it expects 3 arguments.");
    }
    // ... 
}

var largest = DefGuideMath.max(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6);

function func2(x) {
    console.log(x);
    arguments[0] = null;
    console.log(x);
}


var a = [1,2,3,4];
var b = [];
easyCopy({from: a, to: b, length:4})