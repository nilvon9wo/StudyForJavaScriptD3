var documentGeometryHelper = (function () {

    function getValues(contextWindow, configArray) {
        contextWindow = contextWindow || window;

        var values = {};
        configArray.forEach(function (config) {
            var targetValue = config.targetValue;
            var windowProperty = config.windowProperty;
            var altProperty = config.altProperty;

            var result = undefined;
            if (contextWindow[windowProperty] !== null) {
                result = contextWindow[windowProperty];
            } else {
                var contextDocument = contextWindow.document;
                var infoHolder = (contextDocument.compatMode === 'CSS1Compat') ?
                        'documentElement' :
                        'body';
                result = contextDocument[infoHolder][altProperty];
            }
            values[targetValue] = result;
        });
        return values;
    }

    return {
        getElementPosition: function (element) {
            var x = 0;
            var y = 0;

            for (
                    var currentElement = element; // initialize
                    currentElement; // run while true
                    currentElement = currentElement.offsetParent    // increment
                    ) {
                x += currentElement.offsetLeft;
                y += currentElement.offsetTop;
            }

            for (
                    var currentElement = element.parentNode; // initialize
                    currentElement && Node.isElementNode(currentElement); // run while true
                    currentElement = currentElement.parentNode              // increment
                    ) {
                x -= currentElement.scrollLeft;
                y -= currentElement.scrollTop;
            }

            return {
                x: x,
                y: y
            };
        },
        getScrollOffsets: function (contextWindow) {
            return getValues(contextWindow, [
                {targetValue: 'x', windowProperty: 'pageXOffset', altProperty: 'scrollLeft'},
                {targetValue: 'y', windowProperty: 'pageYOffset', altProperty: 'scrollTop'}
            ]);
        },
        getViewportSize: function (contextWindow) {
            return getValues(contextWindow, [
                {targetValue: 'w', windowProperty: 'innerWidth', altProperty: 'clientWidth'},
                {targetValue: 'h', windowProperty: 'innerHeight', altProperty: 'clientHeight'}
            ]);
        },
        getBoundingClientRectInDocumentCoordinates: function (element) {
            var box = element.getBoundingClientRect();
            var offset = this.getScrollOffsets();
            return {
                left: box.left + offset.x,
                top: box.top + offset.y,
                right: box.right + offset.x,
                bottom: box.bottom + offset.y,
                width: box.width || (box.right - box.left),
                height: box.height || (box.bottom - box.top)
            };
        },
        scrollToBottom: function () {
            var documentHeight = document.documentElement.offsetHeight;
            var viewportHeight = window.innerHeight;
            window.scrollTo(0, documentHeight - viewportHeight);
        }
    };
}());
