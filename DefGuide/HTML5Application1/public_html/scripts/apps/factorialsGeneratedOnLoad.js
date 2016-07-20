'use strict';

function createElement(element, innerContent) {
    'use strict';
    var newString = '';

    function makeInnerContent(innerContent) {
        if (typeof innerContent === 'function') {
            return innerContent();
        } else {
            return innerContent;
        }
    }

    newString += '<' + element + '>';

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

function generateFactorialRows() {
    var factorialTable = '';
    for (var i = 1; i <= 10; i++) {
        factorialTable += createElement('tr', [
            createElement('td', i),
            createElement('td', Math.factorial(i))
        ])
    }
    return factorialTable;
}

document.write(
    createElement('table', [
        createElement('tr', [
            createElement('th', 'n'),
            createElement('th', 'n!'),
        ]),
        generateFactorialRows
    ]) +
    createElement('p', 'Generated at ' + new Date())
);
