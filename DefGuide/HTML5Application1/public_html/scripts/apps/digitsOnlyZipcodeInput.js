/* global eventHelper */

whenReady(function () {
    var inputElements = document.getElementsByTagName('input');
    inputElements.toArray().forEach(function (inputElement) {
        if (
                inputElement.type === 'text' &&
                inputElement.getAttribute('data-allowed-chars')
                ) {
            eventHelper.addEvent(inputElement, 'keypress', filter);
            eventHelper.addEvent(inputElement, 'textInput', filter);
            eventHelper.addEvent(inputElement, 'textinput', filter);

        }
    });

    function filter(event) {
        event = event || window.event;
        var target = event.target || event.srcElement;
        var text = extractText(event);
        if (!text) {
            return;
        }

        toggleInvalidMessage(target, validateText(target, text));
    }
    
    function extractText(event){
        if (event.type.toLowerCase() === 'textinput') {
            return event.data;
        } 
        
        var code = event.charCode || event.keyCode;
        if (
                code < 32 ||
                event.charCode === 0 ||
                event.ctrlKey ||
                event.altKey
                ) {
            return;
        }
        return String.fromCharCode(code);
    }
    
    function validateText(target, text) {
        var allowed = target.getAttribute('data-allowed-chars');
        for (var index = 0; index < text.length; index++) {
            var char = text.charAt(index);
            if (allowed.indexOf(char) === -1) {
                eventHelper.preventDefault(event);
                return false;
            }
        }
        return true;
    }
    
    function toggleInvalidMessage(target, isValid){
        var messageId = target.getAttribute('data-messageid');
        if (messageId) {
            var messageElement = document.getElementById(messageId);
            if (messageElement) {
                messageElement.style.visibility = (isValid) ? 'hidden' : 'visible';
                if (!isValid) {
                    setTimeout(function(){
                        console.log('timed out');
                        toggleInvalidMessage(target, true);
                    }, 1000);
                }
            }
        }
    }
});