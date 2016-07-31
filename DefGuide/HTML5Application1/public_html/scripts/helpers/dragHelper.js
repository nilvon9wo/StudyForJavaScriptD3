/* global eventHelper, documentGeometryHelper */

var dragHelper = (function () {

    function getStart(event, scroll) {
        return {
            x: event.clientX + scroll.x,
            y: event.clientY + scroll.y
        };
    }

    function getOriginal(elementToDrag) {
        return {
            x: elementToDrag.offsetLeft,
            y: elementToDrag.offsetTop
        };
    }

    function getDelta(start, original) {
        return {
            x: start.x - original.x,
            y: start.y - original.y
        };
    }

    function drag(elementToDrag, event) {
        var scroll = documentGeometryHelper.getScrollOffsets();
        var start = getStart(event, scroll);
        var original = getOriginal(elementToDrag);
        var delta = getDelta(start, original);

        modifyEvents({
            standardPrefix: 'add',
            iePrefix: 'attach',
            ieCapturePrefix: 'set'
        });

        eventHelper.stopPropagation(event);
        eventHelper.preventDefault(event);

        function moveHandler(event) {
            event = event || window.event;

            var scroll = documentGeometryHelper.getScrollOffsets();
            elementToDrag.style.left = (event.clientX + scroll.x - delta.x) + 'px';
            elementToDrag.style.top = (event.clientY + scroll.y - delta.y) + 'px';
            eventHelper.stopPropagation(event);
        }

        function upHandler() {
            event = event || window.event;
            modifyEvents({
                standardPrefix: 'remove',
                iePrefix: 'detach',
                ieCapturePrefix: 'release'
            });
            eventHelper.stopPropagation(event);
        }

        function modifyEvents(config) {
            var standardPrefix = config.standardPrefix;
            var standardMethod = standardPrefix + 'EventListener';

            var iePrefix = config.iePrefix;
            var ieMethod = iePrefix + 'Event';

            if (document[standardMethod]) {
                document[standardMethod]('mousemove', moveHandler, true);
                document[standardMethod]('mouseup', upHandler, true);
            } else if (document[ieMethod]) {
                elementToDrag[config.ieCapturePrefix + 'Capture']();
                elementToDrag[ieMethod]('onmousemove', moveHandler);
                elementToDrag[ieMethod]('onmouseup', upHandler);
                elementToDrag[ieMethod]('onlosecapture', upHandler);
            }
        }
    }

    return {
        drag: drag
    };

}());

