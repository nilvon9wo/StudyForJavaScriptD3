/* global Element */

var Insert = (function () {
    if (document.createElement('div').insertAdjacentHTML) {
        return {
            before: function (element, html) {
                element.insertAdjacentHTML('beforebegin', html);
            },
            atStart: function (element, html) {
                element.insertAdjacentHTML('afterbegin', html);
            },
            atEnd: function (element, html) {
                element.insertAdjacentHTML('beforeend', html);
            },
            after: function (element, html) {
                element.insertAdjacentHTML('afterend', html);
            }
        };
    }

    function fragment(html) {
        var element = document.createElement('div');
        var fragment = document.createDocumentFragment();
        element.innerHTML = html;
        while (element.firstChild) {
            fragment.appendChild(element.firstChild);
        }
        return fragment;
    }

    var Insert = {
        before: function (element, html) {
            element.parentNode.insertBefore(fragment(html), element);
        },
        atStart: function (element, html) {
            element.insertBefore(fragment(html), element.firstChild);
        },
        atEnd: function (element, html) {
            element.appendChild(fragment(html));
        },
        after: function (element, html) {
            element.parentNode.insertBefore(fragment(html), element.nextSibling);
        }
    };

    Element.prototype.insertAdjacentHtml = function (position, html) {
        switch (position.toLowerCase()) {
            case 'beforebegin' :
                return Insert.before(this, html);
            case 'afterbegin' :
                return Insert.atStart(this, html);
            case 'beforeend' :
                return Insert.atEnd(this, html);
            case 'afterend' :
                return Insert.after(this, html);
        }
    };

    return Insert;
})();