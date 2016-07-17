/* global AbstractHelper, net */

net.nowhereatall.registerSet('AbstractSet', function () {
    var AbstractSet = function () {
        AbstractHelper.constructor();
    };

    net.nowhereatall.collections.sets.AbstractSet.extendPrototype({
        contains: AbstractHelper.method()
    });

    return AbstractSet;
}());