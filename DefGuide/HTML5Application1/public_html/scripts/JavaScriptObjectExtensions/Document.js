/* global Document */

Document.embolden = Document.embolden || function(node) {
    if (typeof node === 'string'){
        node = document.getElementById(node);
    }
    
    var parent = node.parentNode;
    var boldElement = document.createElement('b');
    parent.replaceChild(boldElement, node);
    boldElement.appendChild(node);
};

Document.getSelectedText = Document.getSelectedText || function() {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.selection) {
        return document.selection.createRange().text;
    }
};

Document.insertAt = Document.insertAt || function (parent, child, index) {
  if (index < 0 || index > parent.childNodes.length) {
      throw new Error ('invalid index');
  } else if (index === parent.childNodes.length) {
      parent.appendChild(child); 
  } else {
      parent.insertBefore(child, parent.childNodes[index]);
  }
};

Document.reverseChildrenOf = Document.reverseChildrenOf || function (node) {
    var fragment = document.createDocumentFragment();
    while (node.lastChild) {
        fragment.appendChild(node.lastChild);
    }
    node.appendChild(fragment);
};

Document.method('getElementsByIds', function () {
    'use strict';
    var args = arguments.toArray();
    var elementIds = (args.length === 1 && args[0].isArray()) ? args[0] : elementIds;

    var elements = {};
    elementIds.forEach(function (elementId) {
        elements[elementId] = document.getElementById(elementId);
        if (!elements[elementId]) {
            throw new Error('No element with id' + elementId);
        }
    });
    return elements;
});

Document.method('getParent', function (element, n) {
    n = n || 1;
    while (n-- && element) {
        element = element.parentNode;
    }

    return Node.isElementNode(element) ? element : null;
});


Document.method('getSibling', function (element, n) {
    function findSibling(element, preposition, increment) {
        var wantedSibling = preposition + 'ElementSibling';
        if (element[wantedSibling]) {
            element = element[wantedSibling];
        } else {
            for (
                    element = element[wantedSibling]; // initialize
                    !Node.isElementNode(element); // run while true
                    element = element[wantedSibling]    // after each iteration
                    ) {
                // empty loop
            }
            n = n + increment;
        }
        return element;
    }

    while (element && n !== 0) {
        if (n > 0) {
            element = findSibling(element, 'next', -1);
        } else {
            element = findSibling(element, 'previous', 1);
        }
    }
    return element;
});

Document.method('getChild', function (element, n) {
    function findChild(element, startPosition, incrementPreposition) {
        if (element[startPosition + 'ElementChild']) {
            element[startPosition + 'ElementChild'];
        } else {
            for (
                    element = element[startPosition + 'Child']; // initialize
                    !Node.isElementNode(element); // run while true
                    element = element[incrementPreposition + 'Sibling']    // after each iteration
                    ) {
                // empty loop
            }
        }
        return element;
    }

    if (element.children) {
        if (n < 0) {
            n += element.children.length;
        }
        if (n < 0) {
            return null;
        }
        return element.children[n];
    }

    if (n >= 0) {
        element = findChild(element, 'first', 'next');
        return Document.getSibling(element, n);
    } else {
        element = findChild(element, 'last', 'previous');
        return Document.getSibling(element, n + 1);
    }
});

Document.method('textContent', function textContent(element){
    var string = '';
    for (var child = element.firstChild; child !== null; child = child.nextSibling) {
        switch (child.nodeType) {
            case Node.TEXT_NODE:
            case Node.CDATA_SECTION_NODE: string += child.nodeValue; break;
            case Node.ELEMENT_NODE: string += textContent(child);
        }
    }
    return string;
});
