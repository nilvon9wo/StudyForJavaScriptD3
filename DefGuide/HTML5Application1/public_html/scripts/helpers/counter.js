/* global uniqueInteger */

var counter = (function(currentValue){
    currentValue = currentValue || 0;
    'use strict';
    return {
        get count() { return n++; },
        set count(newValue) {
          if (newValue >= currentValue){ currentValue = newValue; }
          else throw new Error ("count can only be set to a larger currentValue");
        },
        reset: function () {
            currentValue = 0;
        }
    }
}());
