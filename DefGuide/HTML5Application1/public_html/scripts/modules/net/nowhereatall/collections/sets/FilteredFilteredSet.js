/* global net */

net.nowhereatall.registerSet('FilteredFilteredSet', function () {
    return FilteredSet(
            net.nowhereatall.collections.sets.NonNullSet,
            function (x) {
                return !(x instanceof net.nowhereatall.collections.sets.Set);
            }
    );
}());



