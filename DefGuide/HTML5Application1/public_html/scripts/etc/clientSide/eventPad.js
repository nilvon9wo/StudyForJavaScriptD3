window.onload = (function () {
    function validate(forn) {
        // TODO
    }
    
    function handleMouseMove(){
        // TODO
    }

    function handleMouseUp(){
        // TODO
    }

    function issueAlert(message) {
        return function () {
            alert(message);
        };
    }

     return function() {
        var element = document.getElementById('shipping_address');
        element.onsubmit = function () {
            return validate(this);
        };

        var button = document.getElementById('myButton');
        button.onclick = issueAlert('Thanks for clicking me!');
        button.addEventListener(
                'click',
                issueAlert('Thanks again!'),
                false
                );
        
        var handler = issueAlert('Thanks!');
        if (button.addEventListener) {
            button.addEventListener('click', handler, false);
        } else {
            button.attachEvent('onclick', handler);
        }

        document.removeEventListener('mousemove', handleMouseMove, true);
        document.removeEventListener('mouseup', handleMouseUp, true);
    };
}());
