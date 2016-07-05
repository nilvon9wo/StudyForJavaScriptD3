function hide(element, reflow) {
    "use strict";
    if (reflow){
        element.style.display = 'none';
    }
    else {
        element.style.visibility = 'hidden';
    }
}
