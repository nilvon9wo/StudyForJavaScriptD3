var inputHelper = (function () {
    function upcase(event) {
        this.value = this.value.toUpperCase();
    }
    
    function upcaseOnPropertyChange(event) {
        event = event || window.event;
        if (event.proeprtyName === 'value') {
            this.onpropertychange = null;
            this.value = this.value.toUpperCase();
            this.onpropertychange = upcaseOnPropertyChange;
        }
    }

    return {
        forceToUpperCase: function (element) {
            if (typeof element === 'string') {
                element = document.getElementById(element);
            }
            element.oninput = upcase;
            element.onpropertychange = upcaseOnPropertyChange;
        }
    };
}());


