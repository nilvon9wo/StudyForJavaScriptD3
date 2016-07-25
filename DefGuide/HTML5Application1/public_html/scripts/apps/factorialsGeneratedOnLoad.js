'use strict';


function generateFactorialRows() {
    var factorialTable = '';
    for (var i = 1; i <= 10; i++) {
        factorialTable += createElement('tr', undefined, [
            createElement('td', undefined, i),
            createElement('td', undefined, Math.factorial(i))
        ]);
    }
    return factorialTable;
}

document.write(
    createElement('table', undefined, [
        createElement('tr', undefined, [
            createElement('th', undefined, 'n'),
            createElement('th', undefined, 'n!')
        ]),
        generateFactorialRows
    ]) +
    createElement('p', undefined, 'Generated at ' + new Date())
);
