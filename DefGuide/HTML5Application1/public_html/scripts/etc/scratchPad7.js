/* global DGMath, Function */

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

var distance = DGMath.distance;
var total = distance(new Point(0, 0), new Point(2, 1)) +
        distance(new Point(2, 1), new Point(3, 5));

var factorial = DGMath.factorial;
var probability = DGMath.factorial(5) / DGMath.factorial(5);

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

var largest = DGMath.max(1, 10, 100, 2, 3, 1000, 4, 5, 10000, 6);

function func2(x) {
    console.log(x);
    arguments[0] = null;
    console.log(x);
}


var a = [1, 2, 3, 4];
var b = [];
easyCopy({from: a, to: b, length: 4});

var s = DGMath.square;
square(4);
s(4);

var array = [DGMath.square, 20];
array[0](array[1]);

var operate = Function.operate;
var add = DGMath.add;
var multiply = DGMath.multiply;
var i = operate(add,
            operate(add, 2, 3),
            operate(multiply, 4, 5)
        );

var operate = DGMath.operate.bind(DGMath);
var j = operate('add', 'hello', operate('add', ' ', 'world'));
var k = operate('pow', 10, 2);

var scope = "global scopde";
function checkScope(){
    'use strict';
    var scope = "local scope";
    function func(){
        return scope;
    }
    return func;
}
checkScope()();

var c = counter(1000);
var d = counter();
c.count
d.count;
c.reset;
c.count;
d.count;
c.count = 2000;
c.count;
c.count = 2000;

var obj = {};
obj.addPrivateProperty('Name', function(x){
    'use strict';
    return typeof x === 'string';
});
obj.setName('Frank');
console.log(obj.getName());
obj.setName(0);

function constFunc(value){
    'use strict';
    return function(){
        return value;
    }
}
var funcs = [];
for (var i = 0; i < 10; i++){
    funcs[i] = constFunc(i);
}
func[5]();


function constFuncs(){
    'use strict';
    var funcs = [];
    for (var i = 0; i < 10; i++){
        funcs[i] = function() { return i; }
    }
    return funcs;
}
var funcs = constFuncs();
func[5]();

function func(x,y,z){
    "use strict";
    Function.check(arguments);
    return x + y + z;
}


func.call(obj);
func.apply(obj);

obj.method = func;
obj.method();
delete obj.method;


func.call(obj, 1, 2);
func.apply(obj, [1, 2]);

function func(y){
    'use strict';
    return this.x + y;
}
var obj = { x: 1 };
var g = func.bind(obj);
g(2);

var succ = DGMath.sum.bind(null, 1);
succ(2);


function func(y, z){
    "use strict";
    return this.x + y + z
};
var g = func.bind({x:1}, 2);
g(3);

var func1 = new Function('x', 'y', 'return x * y;');
var func2 = function(x,y) { return x * y; }

var scope = "global";
function constructFunction(){
    'use strict';
    var scope = 'local';
    return new Function('return scope');
}
constructFunction()();




