
function createElement(element, attributes, innerContent) {
    'use strict';
    var newString = '';
    var attributes = attributes || {};

    function addAttributes(attributes) {
        var attributeString = '';
        for (var property in attributes){
            attributeString += ' ' + property + '=' + attributes[property] + ' ';
        }
        return attributeString;
    }

    function makeInnerContent(innerContent) {
        if (typeof innerContent === 'function') {
            return innerContent();
        } else {
            return innerContent;
        }
    }

    newString += '<' + element + addAttributes(attributes) + '>';

    if (innerContent) {
        if (!innerContent.isArray()) {
            innerContent = [innerContent];
        }
        innerContent.forEach(function (content) {
            newString += makeInnerContent(content);
        });
    }

    newString += '</' + element + '>';
    return newString;

}