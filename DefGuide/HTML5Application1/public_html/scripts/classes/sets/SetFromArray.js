/* global Set */

function SetFromArray(array){
    Set.apply(this, array);
}

SetFromArray.prototype = Set.prototype;

