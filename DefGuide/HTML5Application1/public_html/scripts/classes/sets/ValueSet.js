/* global NonNullSet */

var ValueSet = FilteredSetSubclassFactory(NonNullSet, function(x){
    return typeof x !== 'function';
});