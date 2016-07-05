function highlight(element) {
    "use strict";
    if (!element.className){
        element.className = 'highlight';
    }
    else {
        element.className += ' highlight';
    }
}
