function getElement(elementName) {
    var element = document.getElementById(elementName);
    return element;
}

Object.method('move', function (x, y) {
    if (this.style) {
        this.style.position = "relative";
        this.style.left = x + "px";
        this.style.top = y + "px";
    }
    return this;
});

Object.method('setWidth', function (width) {
    if (this.style) {
        this.style.display = "block";
        this.style.width = width + "px";
    }
    return this;
});

Object.method('setHeight', function (height) {
    if (this.style) {
        this.style.display = "block";
        this.style.height = height + "px";
    }
    return this;
});

Object.method('setColor', function (color) {
    if (this.style) {
        this.style.color = color;
    }
    return this;
});

Object.method('setBorder', function (border) {
    if (this.style) {
        this.style.border = border;
    }
    return this;
});

Object.method('setPadding', function (padding) {
    if (this.style) {
        this.style.padding = padding;
    }
    return this;
});

Object.method('appendText', function (text, element, elemClass) {
    if (this.appendChild) {
        element = element ? element : 'p';
        var newElement = document.createElement(element);
        if (elemClass){
            newElement.setAttribute('class', elemClass);
        }
        var newTextNode = document.createTextNode(text);
        newElement.appendChild(newTextNode);
        this.appendChild(newElement);
    }
    return this;
});

Object.method('on', function (event, callback) {
    if (this.addEventListener) {
        if (typeof callback === 'function') {
            this.addEventListener(event, callback);
        } else {
            this.addEventListener(event, this[callback]());
        }
    }
    return this;
});

Object.method('getNinth', function (m) {
    var m9path = m.path;
    var m9 = (m9path.length > 8) ? m9path[8] : m9path[m9path.length - 1];
    return m9;
});

Object.method('startDrag', function (event, m9) {
    dragStart(event);
    return this;
});

Object.method('drag', function () {
    if (this.on) {
        this.on('drag', function () {
            dragging();
        });
    }
    return this;
});

Object.method('stopDrag', function () {
    if (this.on) {
        this.on('drop', function (event) {
            drop(event);
        });
    }
    return this;
});

Object.method('later', function (wait, callback) {
    setTimeout(callback.bind(this), wait);
    return this;
});

Object.method('setHTML', function (html) {
    this.innerHTML = html;
    return this;
});

Object.method('slide', function (x0, y0, x1, y1) {
    if (this.style) {
        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);
        var sx = (x0 < x1) ? 1 : -1;
        var sy = (y0 < y1) ? 1 : -1;

        var currentX = x0;
        var currentY = y0;
        do {
            this.move(currentX, currentY);  // Do what you need to for this
            currentX += sx;
            if (((currentX > x1) && (sx > 0)) || ((currentX < x1) && (sx < 0))) {
                currentX = x1;
            }
            currentY += sy;
            if (((currentY > y1) && (sy > 0)) || ((currentY < y1) && (sy < 0))) {
                currentY = y1;
            }
        } while ((currentX !== x1) || (currentY !== y1))
    }

    return this;
});

Object.method('tip', function(text){
    this.appendText(text, 'span', 'tooltiptext');
    return this;
});

getElement('myBoxDiv').
    setWidth(100).
    setHeight(100).
    setColor('red').
    setBorder('10px outset').
    setPadding('4px').
    appendText('Please stand up').
    on('dragstart', function (event) {
        this.startDrag(event, this.getNinth(event));
    }).
    on('mousemove', 'drag').
    on('mouseup', 'stopDrag').
    later(100, function () {
        this.
                setColor('yellow').
                setHTML('What hath God wraught?');
    }).
    later(2000, function () {
        this.
                setColor('black').
                setHTML('Something else').
                tip('This box is not really resizeable');
    });

getElement('chaos').
    move(150, 150).
    setWidth(100).
    setHeight(100).
    setColor('purple').
    setBorder('100px outset').
    setPadding('40px').
    later(2000, function () {
        slide(400, 40, 200, 200);
    });
