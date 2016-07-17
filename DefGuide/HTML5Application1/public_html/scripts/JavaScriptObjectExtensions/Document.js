/* global Document */

Document.method('getElementsByIds', function(elements){
    'use strict';
    var collection = {};
    elements.forEach(function(element){
        collection[element] = document.getElementById(element);
    });
    return collection;
});
