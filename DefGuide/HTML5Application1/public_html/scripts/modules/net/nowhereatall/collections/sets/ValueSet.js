/* global net */

net.nowhereatall.registerSet('ValueSet', function () {
    var ValueSet = net.nowhereatall.factories.FilteredSetSubclassFactory(
            net.nowhereatall.collections.sets.NonNullSet,
            function (x) {
                return typeof x !== 'function';
            }
    );

    return ValueSet;
}());



