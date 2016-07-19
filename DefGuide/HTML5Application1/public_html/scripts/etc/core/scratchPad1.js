var book = {
    topic: 'JavaScript',
    author: 'Flanagan',
    contents: {},
    fat: true
};

var primes = [2, 3, 5, 7, 11];

var empty = [];

var data = {
    trial1: [[1,2], [3,4]],
    trial2: [[2,3], [4,5]]
};

var count = 0;
count++;
count--;
count += 2;
count *= 3;

var a = [];
a.push(1,2,3);
a.reverse();

var points = [
    {x: 0, y: 0},
    {x: 1, y: 1}
];
points.distance = function(){
    "use strict";
    var p1 = this[0];
    var p2 = this[1];
    var a = p2.x-p1.x;
    var b = p2.y-p1.y;
    return Math.sqrt(a*a + b*b);
};



