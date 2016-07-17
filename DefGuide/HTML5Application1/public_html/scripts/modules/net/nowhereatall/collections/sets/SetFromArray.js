/* global net */

net.nowhereatall.registerSet('SetFromArray', function () {
    var SetFromArray = function (array) {
        net.nowhereatall.collections.sets.Set.apply(this, array);
    };

    SetFromArray.prototype = net.nowhereatall.collections.sets.Set.prototype;

    return SetFromArray;
}());




