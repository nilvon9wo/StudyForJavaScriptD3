/* global AbstractHelper */

function AbstractSet(){
    AbstractHelper.constructor();
}

AbstractSet.extendPrototype({
    contains : AbstractHelper.method()
});