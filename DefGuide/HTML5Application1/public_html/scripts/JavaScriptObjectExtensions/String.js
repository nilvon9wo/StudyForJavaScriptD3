/* global Function */

String.extendPrototype({
    first : Function.partial(String.prototype.charAt, 0),
    last : Function.partial(String.prototype.substr, -1, 1),
    trim : String.prototype.trim || function(){
        if (!this){
            return this;
        }
        return this.replace(/^\s+|\s+$/g, '');
    }
});