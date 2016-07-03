/* global parsers */

var url = "http://www.ora.com:80/goodparts?q#fragment";
var urlResult = parsers.parseUrl.exec(url);
var urlPartNames = ['url', 'scheme', 'slash', 'host', 'port', 'path', 'query', 'hash'];
var urlResultBlanks = '       ';

urlPartNames.forEach(function(name, index){
    document.writeln(name + ':' + urlResultBlanks.substring(name.length), urlResult[index]);
});

var numberTest = function(number){
    document.writeln(parsers.parseNumber.test(number));
};

numberTest('1');
numberTest('number');
numberTest('98.6');
numberTest('132.21.86.100');
numberTest('123.45E-67');
numberTest('123.45D-67');

var myRegExpLiteral = /"(?:\\.|[^\\\"])*/g;
var myRegExpConstructor = new RegExp("\"(?:\\.|[^\\\\\\\"])*\"",'g');

var text = '<html><body bgcolor=linen><p>' +
        'This is <b>bold<\/b>!<\/p><\/body><\/html>';

var a;
while ((a = parsers.tags.exec(text))){
    for (var i = 0; i < a.length; i++){
        document.writeln(('//['+i+']' + a[i]).entityify());
    }
    document.writeln();
}

var b = /&.+;/.test('frank &amp; beans');

var a2 = text.match(parsers.tags);
for (var i = 0; i < a2.length; i++){
    document.writeln(('//['+i+']' + a2[i]).entityify());
}

var result = 'mother_in_law'.replace('_', '-');

var oldAreaCode = /\((\d{3})\)/g;
var phoneNumber = '(555)666-1212'.replace(oldAreaCode, '$1-');
document.writeln("phone number: " + phoneNumber);

var text2 = 'and in it he says "Any damn fool could';
var pos = text2. search (/["']/);