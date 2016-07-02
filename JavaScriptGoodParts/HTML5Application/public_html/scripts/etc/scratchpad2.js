/* global NaN, Infinity */

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
