/* global Function */

var data = [1, 1, 3, 5, 5];
var func = function(x,y,z){
    return x * (y - z);
};

Function.partialLeft(func, 2)(3, 4);
Function.partialRight(func, 2)(3, 4);
Function.partial(func, undefined, 2)(3, 4);

Math.squareOfSum(2,3);
Math.greatestCommonDenominator(85, 187);
Math.factorial(5);
