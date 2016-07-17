/* global Set, NonNullSet */

var FilteredFilteredSet = FilteredSet(NonNullSet, function (x) {
    return !(x instanceof Set);
});





