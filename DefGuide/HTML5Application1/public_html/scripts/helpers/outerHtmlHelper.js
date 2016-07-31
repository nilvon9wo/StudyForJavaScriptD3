/* global Element */

(function () {
    if (document.createElement('div').outerHTML) {
        return;
    }

    function outerHTMLGetter() {
        var container = document.createElement('div');
        container.appendChild(this.cloneNode(true));
        return container.innerHTML;
    }

    function outerHTMLSetter(value) {
        var container = document.createElement('div');
        container.innerHTML = value;
        while (container.firstChild) {
            this.parentNode.insertBefore(container.firstChild, this);
        }
        this.parentNode.removeChild(this);
    }

    if (Object.defineProperty) {
        Object.defineProperty(Element.prototype, 'outerHTML', {
            get: outerHTMLGetter,
            set: outerHTMLSetter,
            enumerable: false,
            configurable: true
        });
    } else {
        Element.prototype.__defineGetter__('outerHTML', outerHTMLGetter);
        Element.prototype.__defineSetter__('outerHTML', outerHTMLSetter);
    }
})();