const pi = 3.14;
console.log('pi', pi);
let obj = new Point(1, 2);
for (let property in obj) {
    console.log('property: ' + property + ' = ' + obj[property]);
}

let x = 1;
for (let x1 = x + 1; x1 < 5; x1++) {
    console.log(x1);
}

{
    let x2 = x + 1;
    console.log(x2);
}

let x3 = 1;
let y = 2;
let [x4, y4] = [1, 2];
[x4, y4] = [x4 + 1, y4 + 1];
[x4, y4] = [y4, x4];
console.log([x4, y4]);
let [x5, y5] = [1];
[x5, y5] = [1, 2, 3];
[, x, , y] = [1, 2, 3, 4];
let first, second, all;
all = [first, second] = [1, 2, 3, 4];
let [one, [twoA, twoB]] = [1, [2, 2.5], 3];
let transparent = {r: 0.0, g: 0.0, b: 0.0, a: 1};
let {r:red, g:green, b:blue} = transparent;
console.log('red: ', red);
console.log('green: ', green);
console.log('blue: ', blue);
let {r, g, b} = transparent;
console.log('r: ', r);
console.log('g: ', g);
console.log('b: ', b);
let {sin, cos, tan} = Math;
console.log('sin: ', sin);
let data = {
    name: 'destructuring assignment',
    type: 'extension',
    implementation: [
        {engine: 'spidermonkey', version: 1.7},
        {engine: 'rhino', version: 1.7}
    ]
};
let {
    name:feature, implementation:[
    {engine:implementation1, version:version1},
    {engine:implementation2, version:version2}
]
} = data;
console.log(feature);
console.log(implementation1);
console.log(version1);
console.log(implementation2);
console.log(version2);
let Iterator = window.Iterator || undefined;
/* Firefox ONLY */
if (Iterator) {
    console.log('----------------[key,value]');
    for (let [key, value] in Iterator({a: 1, b: 2})) {
        console.log(key + '=' + value);
    }

    console.log('----------------Iterator');
    let obj4 = new Point(1, 2);
    Object.prototype.z = 3;
    for (let property in obj4) {
        console.log(property);
    }
    for (let property in Iterator(obj4, true)) {
        console.log(property);
    }
}

function * map(index, func) {
    for (let x of index) {
        yield func(x);
    }
}
