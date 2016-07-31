(function () {
    var INTERESTED_INDICATOR = false;
    var DISINTERESTED_INDICATOR = undefined;

    function dragAndDrop(list) {
        var originalClass = list.className;
        var entered = 0;
        makeItemsDraggable(list);

        list.ondragend = function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement;

            if (event.dataTransfer.dropEffect === 'move') {
                target.parentNode.removeChild(target);
            }
        };

        list.ondragenter = function (event) {
            event || window.event;
            var fromElement = event.relatedTarget;
            entered++;
            if ((fromElement && !isChild(fromElement, list)) || entered === 1) {
                var dataTransfer = event.dataTransfer;
                var types = dataTransfer.types;
                if (!types || isPlainText(types)) {
                    list.className = originalClass + ' droppable';
                    return INTERESTED_INDICATOR;
                }
                return DISINTERESTED_INDICATOR;
            }
            return INTERESTED_INDICATOR;
        };

        list.ondragleave = function (event) {
            event = event || window.event;
            var toElement = event.relatedTarget;
            entered--;
            if ((toElement && !isChild(toElement, list)) || entered <= 0) {
                list.className = originalClass;
                entered = 0;
            }
            return INTERESTED_INDICATOR;
        };

        list.ondragover = function () {
            return INTERESTED_INDICATOR;
        };

        list.ondragstart = function (event) {
            event = event || window.event;
            var target = event.target || event.srcElement;
            if (target.tagName !== 'LI') {
                return false;
            }
            var dataTransfer = event.dataTransfer;
            dataTransfer.setData('Text', target.innerText || target.textContent);
            dataTransfer.effectAllowed = 'copyMove';
        };

        list.ondrop = function (event) {
            event = event || window.event;
            var dataTransfer = event.dataTransfer;
            var text = dataTransfer.getData('Text');
            if (text) {
                appendTo(list, text);
                list.className = originalClass;
                entered = 0;
                return INTERESTED_INDICATOR;
            }

        };
    }
    
    function isChild(a, b) {
        for (; a; a = a.parentNode) {
            if (a === b) {
                return true;
            }
        }
        return false;
    }

    function isPlainText(types) {
        if (!types) {
            throw new "types parameter is required";
        }
        var plainText = 'text/plain';
        return (types.contains && types.contains(plainText)) ||
                (types.indexOf && types.indexOf(plainText) !== -1);
    }

    function appendTo(list, text) {
        var item = document.createElement('li');
        item.draggable = true;
        item.appendChild(document.createTextNode(text));
        list.appendChild(item);
    }

    function makeItemsDraggable(list) {
        var items = list.getElementsByTagName('li');
        for (var index = 0; index < items.length; index++) {
            items[index].draggable = true;
        }
    }

    whenReady(function () {
        var lists = document.getElementsByTagName('ul');
        var regexp = /\bdnd\b/;

        for (var index = 0; index < lists.length; index++) {
            if (regexp.test(lists[index].className)) {
                dragAndDrop(lists[index]);
            }
        }
    });

}());

