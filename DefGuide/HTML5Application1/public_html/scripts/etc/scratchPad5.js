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

var obj4 = {x: 'don\'t change this value'};
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
    console.log(property)
}

var q = Object.inherit(new Point());
q.x = 0;
q.y = 0;
console.log(q.r);
console.log(q.theta);
