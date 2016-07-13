var empty = [];
var primes = [2, 3, 5, 7, 11];
var misc = [1.1, true, 'a'];

var base = 1024;
var table = [base, base + 1, base + 2, base + 3];

var b = [[1, new Point(1, 2)], [2, new Point(3, 4)]];
var count = [1, undefined, 3];
var undefs = [undefined, undefined, undefined];

var array = ['world'];
var value = array[0];
array[1] = 3.14;
i = 2;
array[i] = 3;
array[i + i] = 'hello';
array[array[i]] = array[0];

var obj = {};
obj[1] = "one";

array[-1.23] = true;
array["1000"] = 0;
array = [];
array[1000] = 0;

var array1 = undefs;
var array2 = new Array(3);

array = [1, 2, 3, 4, 5];
array.length = 3;
array.length = 0;
array.length = 5;
array = [1, 2, 3];

Object.defineProperty(array, 'length', {writable: false});
array.length = 0;
array = [];
array[0] = 'zero';
array[1] = 'one';
array = [];
array.push("zero");
array.push("one", "two");

array = [1, 2, 3];
delete array[1];

var values = obj.keys;
for (var i = 0, len = keys.length; i < len; i++) {
    // ...
}

for (var i = 0; i < array.length; i++) {
    if (!array[i]) {
        continue;
    }
    // ...
}

for (var i = 0; i < array.length; i++) {
    if (a[i] === undefined) {
        continue;
    }
    // ...
}

for (var i = 0; i < array.length; i++) {
    if (!(i in a)) {
        continue;
    }
    // ...
}

var sparseArray;
for (var index in sparseArray) {
    var value = sparseArray[index];
    //...
}

for (var index in array) {
    if (!a.hasOwnProperty(i)) {
        continue;
    }
    //...
}

for (var index in array) {
    if (String(Math.floor(Math.abs((Number(i))))) !== i) {
        continue;
    }
    //...
}

var data = [1, 2, 3, 4, 5];
var sumOfSquares = 0;
data.forEach(function (x) {
    'use strict';
    sumOfSquares += x * x;
});

array = [1, 2, 3];
array.join();
array.join(' ');
array.join('');
var b = new Array(10);
b.join('-');

array = [1, 2, 3];
array.reverse().join();

array = new Array("banana", "cherry", "apply");
array.sort();
var string = array.join(', ');

array = [33, 4, 1111, 222];
array.sort();
array.sort(function (a, b) {
    'use strict';
    return a - b;
});
array.sort(function (a, b) {
    'use strict';
    return b - a;
});

array = ['ant', 'Bug', 'cat', 'Dog'];
array.sort();
array.sort(function (s, t) {
    'use strict';
    var a = s.toLowerCase();
    var b = t.toLowerCase();
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
});

array = [1, 2, 3];
array.concat(4, 5);
array.concat([4, 5]);
array.concat([4, 5], [6, 7]);
array.concat([4, [5, [6, 7]]]);

array = [1, 2, 3, 4, 5];
array.slice(0, 3);
array.slice(3);
array.slice(1, -1);
array.slice(-3, -2);

array = [1, 2, 3, 5, 6, 7, 8, 9];
a.splice(4);
a.splice(1, 2);
a.splice(1, 1);

array = [1, 2, 3, 4, 5];
array.splice(2, 0, 'a', 'b');
array.splice(2, 2, [1, 2], 3);

var stack = [];
stack.push(1, 2);
stash.pop();
stack.push(3);
stash.pop();
stack.push([4, 5]);
stash.pop();
stash.pop();

array = [];
array.unshift(1);
array.unshift(22, 1);
array.shift();
array.unshift(3, [4, 5]);
array.shift();
array.shift();
array.shift();

var data = [1, 2, 3, 4, 5];
var sum = 0;
data.forEach(function (value) {
    'use strict';
    sum += value;
});

data.forEach(function (value, index, array) {
    array[index] = value + 1;
});

array = [1, 2, 3];
var b = array.map(function (x) {
    return x * x;
});

array = [5, 4, 3, 2, 1];
var smallValues = array.filter(function (x) {
    return x < 3
});
var everyOther = array.filter(function (x, i) {
    return i % 2 === 0
});

array = [1, 2, 3, 4, 5];
array.every(function (x) {
    return x < 10;
});
array.every(function (x) {
    return x % 2 === 0;
});
array.some(function (x) {
    return x % 2 === 0;
});
array.some(isNaN);

var objects = [{x: 1}, {y: 2}, {z: 3}];
var merged = objects.reduce(Object.union);

objects = [{x: 1, a: 1}, {y: 2, a: 2}, {z: 3, a: 3}];
var leftUnion = objects.reduce(Object.union);
var rightUnion = objects.reduceRight(Object.union);

array = [0, 1, 2, 1, 0];
array.indexOf(1);
array.lastIndexOf(1);
array.indexOf(3);

Array.isArray([]);
Array.isArray({});

var a = {"0": "a", "1": "b", "2": "c", length: 3};
Array.prototype.join.call(a, "+");
Array.prototype.slice.call(a, 0);
Array.prototype.map.call(a, function (x) {
    'use strict';
    return x.toUpperCase();
});

Array.join.call(a, "+");
Array.slice.call(a, 0);
Array.map.call(a, function (x) {
    'use strict';
    return x.toUpperCase();
});


var string = test;
string.charAt(0);
string = 'JavaScript';
Array.join(string, ' ');
Array.prototype.filter.call(string, function (x) {
    'use strict';
    return x.match(/[^aeiou]/);
}).join('');


