/* global uniqueInteger */

var uniqueIntegers = (function(){
    'use strict';
    var counter = 0;
    return function(){
        return counter++;
    }
}());
