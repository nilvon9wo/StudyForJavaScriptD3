/* global randomNumberGenerator */

'use strict';
var empty = {};
var point1 = new Point(0, 0);
var point2 = new Point(point1.x, point1.y + 1);

var obj = new Object();
var array = new Array();
var date = new Date();
var regExp = new RegExp("js");

var obj1 = Object.create({x:1, y:2});
var obj2 = Object.create(null);
var obj3 = Object.create(Object.prototype);

var obj4 = {x: 'don\'t change this currentValue'};
var libraryFunction;
libraryFunction(Object.inherit(obj4));

var address = '';
var customer;
for (var i = 0; i < 4; i++){
    address += customer['address' + i] + '\n';
}

var obj5 = {}
obj5.x = 1;
var property = Object.inherit(obj5);
property.y = 2;
var queryObj = Object.inherit(property);
queryObj.z = 3;
var string = queryObj.toString();
var qVal = q.x + q.y;

Object.prototype = 0;

var obj6 = {x:1};
delete obj6.x;
delete obj6.x;
delete obj6.toString;
delete 1;

delete Object.prototype;
var x = 1;
delete this.x;
function func(){}
delete this.func;

this.x = 1;
delete this.x;

var obj7 = {x:1};
var obj8 = Object.inherit({y:2});
obj8.x = 1;

var obj9 = {x:1};
var obj10 = {x: undefined};
delete obj10.x;

if (obj10.x !== null){
    obj10.x *= 2;
}

if (obj10.x){
    obj10.x *= 2;
}

var obj11 = {x: 1, y: 2, z: 3};
for (var property in obj11){
    if (!obj11.hasOwnProperty(property) || (typeof obj11[property] === 'function')){
        continue;
    }
    console.log(property);
}

var q = Object.inherit(new Point());
q.x = 0;
q.y = 0;
console.log(q.r);
console.log(q.theta);

Object.getOwnPropertyDescriptor({x:1}, 'x');
Object.getOwnPropertyDescriptor(randomNumberGenerator, 'octet');
Object.getOwnPropertyDescriptor({}, 'x');
Object.getOwnPropertyDescriptor({}, 'toString');

var obj12 = {};
Object.defineProperty(obj12, 'x', {
    value: 1, 
    writable: true, 
    enumerable: false, 
    configurable: true
});
obj12.keys();
Object.defineProperty(obj12, 'x', {writable: false});
obj12.x = 2;
Object.defineProperty(obj12, 'x', {value: 2});
Object.defineProperty(obj12, 'x', {get: function(){ return 0;}});

var p = {x:1};
var o = Object.create(p);

var obj13 = Object.seal(
    Object.create(
            Object.freeze({x:1}), {y: {value: 2, writable: true}}
        )
);

var obj14 = {x:1, y: {z: [false, null, '']}};
var string = JSON.stringify((obj14));
var parsed = JSON.parse(string);

string = new Point(1,1).toString();

