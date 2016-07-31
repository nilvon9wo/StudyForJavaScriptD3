var eventHelper = {
    addEvent: function(target, type, handler){
        if (target.addEventListener) {
            target.addEventListener(type, handler, false);
        } else {
            target.attachEvent('on' + type, function(event){
                return handler.call(target, event);
            });
        }
    },
    cancelHandler: function (event, handler){
        var event = event || window.event;
        
        handler();
        
        if (event.preventDefault){
            event.preventDefault();
        }
        if (event.returnValue){
            event.returnValue = false;
        }
        return false;
    },
    stopPropagation: function (event){
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    preventDefault: function (event){
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = true;
        }
    }
};