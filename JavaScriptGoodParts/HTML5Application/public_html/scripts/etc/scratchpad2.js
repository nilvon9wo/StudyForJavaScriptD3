/* global NaN, Infinity, arrayHelper */


var empty = [];
var numbers = [
    'zero', 'one', 'two', 'three', 'four', 
    'five', 'six', 'seven', 'eight', 'nine'
];


var undef = empty[1];
var one = numbers[1];

var emptyLength = empty.length;
var numbersLength = numbers.length;

var numbersObject = {
    '0': 'zero',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine'
};

var misc = [
    'string', 98.6, true, false, null, undefined,
    ['nested', 'array'], {object:true}, NaN, Infinity
];
var miscLength = misc.length;

var myArray = [];
var myEmptyArrayLength = myArray.length;

myArray[10] = true;
var myNewArrayLength = myArray.length;

numbers.length = 3;
numbers[numbers.length] = 'shi';
numbers.push('go');
delete numbers[2];
numbers.splice(2,1);

for (var i=0; i < myArray.length; i++){
    document.writeln(myArray[i]);
}

var data = [4, 8, 15, 16, 23, 42];
data.total = function(){
    return sum(this);
};
total = data.total();
document.writeln(total);
var dimArray = Array.dim(10,0);

var matrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
];
var m21 = matrix[2][1];

var n = 3;
var twoDimArray = [];
for (var i = 0; i < n; i ++){
    twoDimArray[i] = [];
}

var myMatrix = Array.matrix(4,4,0);
document.writeln(myMatrix[3][3]);

myMatrix = Array.identity(4);
document.writeln(myMatrix[3][3]);

var a = ['a', 'b', 'c'];
var b = ['x', 'y', 'z'];
var c = a.concat(b, true);

a.push('d');
var d = a.join('');

var a2 = ['a', 'b', 'c'];
var e = a2.pop();

var a3 = ['a', 'b', 'c'];
var b3 = ['x', 'y', 'z'];
var c3 = a.push(b, true);

var b4 = a3.reverse();

var a4 = ['a', 'b', 'c'];
var c4 = a4.shift();

var a5 = ['a', 'b', 'c'];
var b5 = a5.slice(0,1);
var c5 = a5.slice(1);
var d5 = a5.slice(1,2);

var n = [4, 8, 15, 16, 23, 42];
n.sort();
n.sort(arrayHelper.compareNumbers);

var m = ['aa', 'bb', 'a', 4, 8, 15, 16, 23, 42];
m.sort(arrayHelper.compareSimpleValues);
document.writeln("m:" + m);

var n = ['a4', 442, 'b2', 68, 44, '1a', 415, 166, 123];
n.sort(arrayHelper.compareSimpleValues);
document.writeln("n:" + n);


var a6 = ['a', 'b', 'c'];
var r1 = a6.splice(1, 1, 'ache', 'bug');
document.writeln("r1:" + r1);
document.writeln("a6:" + a6);

var a7 = ['a', 'b', 'c'];
var r2 = a6.unshift('?', '@');

var x = function(){
    return this.value;
}.bind({value:666});
alert(x());