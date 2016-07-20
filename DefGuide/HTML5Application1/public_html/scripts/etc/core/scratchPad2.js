var si = true;
var pi = 3.14;

var b = 4;

var x = .3 - .2;
var f = undefined;
var y = x + f;

var a = {value:3};
(a.value + b).toString();
a.sort();

y = .2 - .1;

var then = new Date(2010, 0, 1);
var later = new Date(2010, 0, 1, 17, 10, 30);
var now = new Date();
var elapsed = now - then;

var message = 'Hello, ' + 'world';
var name = 'Brian';
var greeting = 'Welcome to my blog, ' + ' ' + name;

var text = 'testing: 1, 2, 3';
var pattern = /\d+/g;
pattern.test(text);
text.search(pattern);
text.match(pattern);
text.replace(pattern, '#');
text.split(/\D+/);

if (a === 4){
    b++;
} else {
    a++;
}

var obj;
if (obj) {

}

var z;
if ((x === 0 && y === 0) || (z !== 0)){

}

var global = this;

var string = 'hello, world';
string = 'hello world!';
var word = string.substring(string.indexOf(' ') + 1, string.length);
string = 'test';
string.length = 4;
var t = string.length;
var stringObj = new String(string);
string = 'hello';
string.toUpperCase();


var number = 1;
var numberObj = new Number(number);
number = 17;
var binaryString = nunber.toString(2);
var octalString = '0' + number.toString(8);
var hexString = '0x' + number.toString(16);
number = 123456.789;

var boolean = true;
var booleanObj = new Boolean(boolean);

obj = { x : 1 };
obj.x = 2;
obj.y = 3;

var array = [1, 2, 3];
array[0] = 0;
array[3] = 4;

var p = { x : 1 };
array = [];
b = array;
b[0] = 1;

array = ['a', 'b', 'c'];
b = [];
array.forEach(function(elem, index){
    "use strict";
    b[index] = elem;
});

var date = new Date(2010, 0, 1);
now = new Date();

var sum;
message = 'hello';
for (var i = 0; i < 10; i++){
    console.log(i);
}
for (var i = 0, j = 10; i < 10; i++, j--){
    console.log(i * k);
}
for (var p in obj){
    console.log(p);
}

i = 'ten';

var scope = 'global';
function checkscope(){
    'use strict';
    var scope = 'local';
    return scope;
}
checkscope;

scope = 'global';
function checkscope2(){
    'use strict';
    scope = 'local';
    var myscope = 'local';
    return [scope, myscope];
}
checkscope2();

scope = 'global scope';
function checkscope3(){
    'use strict';
    var scope = 'local scope';
    function nested(){
        'use strict';
        return scope;
    }
    return nested();
}
checkscope3();

function test(obj){
    var i = 0;
    if (typeof obj === 'object'){
        var j = 0;
        for (var k = 0; k < 10; k++){
            console.log(k);
        }
        console.log(k);
    }
    console.log(j);
}

scope = 'global';
function func(){
    'use strict';
    console.log(scope);
    var scope = 'local';
    console.log(scope);
}

var truevar = 1;
fakevar = 2;
this.fakevar2 = 3;
delete truevar;
delete fakevar;
delete this.fakevar2;

