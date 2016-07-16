/* global Function */

String.method('first', function(){
    return Function.partial(String.prototype.charAt, 0);
});

String.method('last', function(){
    return Function.partial(String.prototype.substr, -1, 1);
});