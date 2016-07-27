/* global Element */

Element.method('next', function() {
    if (this.nextElementSibling){
        return this.nextElementSibling;
    }
    
    var sibling = this.nextSibling;
    while (!Node.isElementNode(sibling)) {
        sibling = sibling.nextSibling;
    }
    return sibling;
});

Element.method('textContent', function(element, value) {
    var content = element.textContent;
    if (value === undefined) {
        return content || element.innerText;
    } else {
        var setMethod = (content !== undefined) ? 'textContent' : 'innerText';
        element[setMethod] = value;
    }
});

Element.prototype.__defineGetter__('children', function() {
    var children = [];
    for (var child = this.firstChild; child !== null; child = child.nextSibling){
        if (Node.isElementNode(child)){
            children.push[child];
        }
    }
    return children;
});

