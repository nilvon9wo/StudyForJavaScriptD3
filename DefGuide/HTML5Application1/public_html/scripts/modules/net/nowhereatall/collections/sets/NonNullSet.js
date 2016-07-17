/* global net */

net.nowhereatall.registerSet('NonNullSet', function () {
    return new net.nowhereatall.collections.sets.FilteredSet(
            new net.nowhereatall.collections.sets.Set(),
            function (x) {
                return x !== null;
            }
    );
}());







