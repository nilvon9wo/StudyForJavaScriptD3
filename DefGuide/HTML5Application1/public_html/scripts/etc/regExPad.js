var pattern1 = /s$/;
var pattern2 = new RegExp('s$');

var text = 'The quick brown javascript jumped over the lazy python.';
text.replace(/javascript/gi, 'JavaScript');

var quote = /"([^"]*)"/g;
text.replace(quote, '“$1”');

'1 plus 2 equals 3'.match(/\d+/g);

var urlPattern = /(\w+):\/\/([\w.]+)\/(\S*)/;
text = "Visit my blog at http://www.example.com/~david";
console.log('url', urlPattern);
console.log('text', text);
var result = text.match(urlPattern);
if (result !== null) {
    console.log('result fullurl', result[0]);
    console.log('result protocol', result[1]);
    console.log('result host', result[2]);
    console.log('result path', result[3]);
}

'123,456,789'.split(',');
console.log('1, 2, 3, 4, 5'.split(/\s*,\s*/).join(' --- '));

var zipcode = new RegExp('\\d{5}', 'g');

var pattern3 = /Java/g;
var text = 'JavaScript is more fun than Java!';
var result;
while ((result = pattern3.exec(text)) !== null) {
    console.log('Matched \'' + result[0] + '\''
            + ' at position ' + result.index +
            '; next search begins at ' + pattern3.lastIndex
            );
}

var pattern4 = /Java/i;
pattern4.test('JavaScript');
