/* global Set */

var NonNullSet = new FilteredSet(new Set(), function (x) {
    return x !== null;
});





