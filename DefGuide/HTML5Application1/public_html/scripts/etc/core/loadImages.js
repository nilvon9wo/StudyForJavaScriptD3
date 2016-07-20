window.onload = function(){
    "use strict";
    var images = document.getElementsByTagName('img').toArray();
    images.forEach(function(image){
        if (image.addEventListener){
            image.addEventListener('click', hide, false);
        }
        else {
            image.attachEvent('onclick', hide);
        }
    });

    function hide(event) {
        event.target.style.visibility = 'hidden';
    }
};
