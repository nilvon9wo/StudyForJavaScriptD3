function copy(o, p){
    p = p || {};
    //...    
}

function stop(){
    //...    
}

var obj = {x:1, y:{z:3}};
var array = [0,4,[5,6]];

var x;
var y;
var z;

var w = (x + y) * z;
    w = ((x - y) - z);

x = ~-y;
x = ~(-y);

w = x = y = z;

var a;
var b;
var c;
var d;
var e;
var f;
var g;
var q = a ? b : c ? d : e ? f : g;

var i1 = 1; 
var j1 = ++i1;

var i2 = 1; 
var j2 = i2++;

var data = [7, 8, 9];

var o = { x: 1};
o.x = 1;

p = null;


if (a === b){
    stop();
}
(a === b) && stop();

var maxWidth;
var preferences = {};
var max = maxWidth || preferences.maxWidth || 500;

var i = 0;
var j = 1;
var k = 2;
i = j = k = 0;

var total;
var salesTax;
total += salesTax;

var data = [];
data[i++] *= 2;
data[i++] = data[i++] * 2;

eval("3+2");
eval("function f(){ return x + 1; } ");

x = 'global';
y = 'global';
function f(){
    var x = 'local';
    eval("x += 'changed';");
    return x;
}

function g(){
    var y = 'local';
    var geval = eval;
    geval("x += 'changed';");
    return y;
}

console.log(f(), x);
console.log(g(), y);

var username;
var greeting = 'hello' + (username ? username : "there");

a = [1, 2, 3];
delete a[2];

o = Point(1,2);
delete o.x;
typeof o.x;
delete o.x;
delete o;
delete 1;
this.x = 1;
delete x;

for (var i = 0, j = 10; i < j; i++, j--){
    console.log(i+j);
}




