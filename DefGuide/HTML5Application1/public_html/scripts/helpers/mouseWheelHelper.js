/* global browserDetectionHelper, eventHelper */

var mouseWheelHelper = (function(){
    var isMacWebkit = browserDetectionHelper.isMacWebkit;
    var isFirefox = browserDetectionHelper.isFirefox;

    function createFrame(content, frameSize) {
        var frame = document.createElement('div');
        frame.className = 'enclosure';
        frame.style.width = frameSize.width + 'px';
        frame.style.height = frameSize.height + 'px';
        frame.style.overflow = 'hidden';
        frame.style.boxSizing = 'border-box';
        frame.style.webkitBoxSizing = 'border-box';
        frame.style.MozBoxSizing = 'border-box';
        content.parentNode.insertBefore(frame, content);
        frame.appendChild(content);
        return frame;
    }
    
    function resizeFrame(frame, frameSize, contentSize, delta) {
        function resize (deltaDim, measureDim, maxOffSet){
            if (delta[deltaDim]){
                frameSize[measureDim] -= delta[deltaDim] / 1000;
                frameSize[measureDim] = Math.min(frameSize[measureDim], contentSize[measureDim]);
                frameSize[measureDim] = Math.max(frameSize[measureDim] - maxOffSet, 50);
                frame.style[measureDim] = frameSize[measureDim] + 'px';
            }
        }
        resize('x', 'width', 0);
        resize('y', 'height', delta.y);
    }

    function positionContent(content, contentCoordinates) {
        content.style.position = 'relative';
        content.style.left = contentCoordinates.x + 'px';
        content.style.top = contentCoordinates.y + 'px';
    }
    
    function panContent(content, contentCoordinates, frameSize, contentSize, delta) {
        function pan(coordinate, measure, position){
            if (delta[coordinate]){
                var minOffset = Math.min(frameSize[measure] - contentSize[measure], 0);
                contentCoordinates[coordinate] = Math.max(contentCoordinates[coordinate] + delta[coordinate], minOffset);
                contentCoordinates[coordinate] = Math.min(contentCoordinates[coordinate], 0);
                content.style[position] = contentCoordinates[coordinate] + 'px';
            }
        }
        pan('x', 'width', 'left');
        pan('y', 'height', 'top');
    }
    
    function getContentSize(content) {
        var contentBox = content.getBoundingClientRect();
        return {
            width: contentBox.right - contentBox.left,
            height: contentBox.bottom - contentBox.top
        };
    }
    
    function getDelta(event){
        var delta = {
            x: (event.deltaX * -30 || 
                    event.wheelDeltaX / 4 || 
                    0) / 360,
            
            y: (event.deltaY * -30 || 
                    event.wheelDeltaY / 4 || 
                    (event.wheelDeltaY === undefined && event.wheelDelta/4) ||
                    event.detail * -10 ||
                    0) / 360
        };
        
        if (isMacWebkit) {
            delta.x /= 30;
            delta.y /= 30;
        } 
        
        return delta;
    }
    
    function registerMousewheelEventHandlers(frame, wheelHandler) {
        frame.onwheel = wheelHandler;
        frame.onmousewheel = wheelHandler;
        if (isFirefox) {
            frame.addEventListener('DOMMouseScroll', wheelHandler, false);
        }
    }
    
    function enclose (content, frameWidth, frameHeight, contentX, contentY) {
        var frameSize = {
            width: Math.max(frameWidth, 50),
            height: Math.max(frameHeight, 50)
        };
        var frame = createFrame(content, frameSize);
        
        var contentCoordinates = {
            x: Math.min(contentX, 0) || 0,
            y: Math.min(contentY, 0) || 0
        };

        positionContent(content, contentCoordinates);
        registerMousewheelEventHandlers(frame, wheelHandler);

        function wheelHandler(event) {
            var event = event || window.event;
            if (isFirefox && event.type !== 'DOMMouseScroll') {
                frame.removeEventListener('DOMMouseScroll', wheelHandler, false);
            }

            var delta = getDelta(event);
            var contentSize = getContentSize(content);
            
            if (event.altKey) {
                resizeFrame(frame, frameSize, contentSize, delta);
            } else {
                panContent(content, contentCoordinates, frameSize, contentSize, delta);
            }
        }
        
        eventHelper.stopPropagation(event);
        eventHelper.preventDefault(event);
    }
    
    
    return {
        enclose: enclose
    };
}());
        
        
        
