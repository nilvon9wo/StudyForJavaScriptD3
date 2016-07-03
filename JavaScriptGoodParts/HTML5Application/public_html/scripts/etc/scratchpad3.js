var pi = Math.PI;

document.writeln('\n\nMath.PI.toExponential');
document.writeln('Default: ' + pi.toExponential());
document.writeln('0: ' + pi.toExponential(0));
document.writeln('2: ' + pi.toExponential(2));
document.writeln('7: ' + pi.toExponential(7));
document.writeln('8: ' + pi.toExponential(8));
document.writeln('16: ' + pi.toExponential(16));
document.writeln('20: ' + pi.toExponential(20));
// OUT OF RANGE: document.writeln('21: ' + pi.toExponential(21));
// OUT OF RANGE: document.writeln('36: ' + pi.toExponential(36));

document.writeln('\n\nMath.PI.toFixed');
document.writeln('Default: ' + pi.toFixed());
document.writeln('0: ' + pi.toFixed(0));
document.writeln('2: ' + pi.toFixed(2));
document.writeln('7: ' + pi.toFixed(7));
document.writeln('8: ' + pi.toFixed(8));
document.writeln('16: ' + pi.toFixed(16));
document.writeln('20: ' + pi.toFixed(20));
// OUT OF RANGE: document.writeln('21: ' + pi.toFixed(21));
// OUT OF RANGE: document.writeln('36: ' + pi.toFixed(36));

document.writeln('\n\nMath.PI.toPrecision');
document.writeln('Default: ' + pi.toPrecision());
// OUT OF RANGE: document.writeln('0: ' + pi.toPrecision(0));
document.writeln('2: ' + pi.toPrecision(2));
document.writeln('7: ' + pi.toPrecision(7));
document.writeln('8: ' + pi.toPrecision(8));
document.writeln('16: ' + pi.toPrecision(16));
document.writeln('20: ' + pi.toPrecision(20));
document.writeln('21: ' + pi.toPrecision(21));
// OUT OF RANGE: document.writeln('36: ' + pi.toPrecision(36));

document.writeln('\n\nMath.PI.toString');
document.writeln('Default: ' + pi.toString());
// OUT OF RANGE: document.writeln('0: ' + pi.toString(0));
document.writeln('2: ' + pi.toString(2));
document.writeln('7: ' + pi.toString(7));
document.writeln('8: ' + pi.toString(8));
document.writeln('16: ' + pi.toString(16));
document.writeln('20: ' + pi.toString(20));
document.writeln('21: ' + pi.toString(21));
document.writeln('36: ' + pi.toString(36));

var a = {member:true};
var b = Object.create(a);
var t = a.hasOwnProperty('member');
var u = b.hasOwnProperty('member');
var v = b.member;

var text = 'Mississippi';
var p = text.indexOf('ss');
p = text.indexOf('ss', 3);
p = text.indexOf('ss', 6);
p = text.lastIndexOf('ss', 3);
p = text.lastIndexOf('ss', 6);

var m = ['AAA', 'A', 'aa', 'a', 'Aa', 'aaa'];
m.sort(function(a,b){
    return a.localeCompare(b);
});

var text2 = 'and in it he says "Any damn fool could';
var a = text.slice(18);
var a = text.slice(0,3);
var a = text.slice(-5);
var a = text.slice(19,32);

var digits = '0123456789';
var aDigits = digits.split('', 5);

var ip = '192.168.1.0';
var bIp = ip.split('.');

var c2 = 'a|b|c|'.split('|');

var text3 = 'last, first, middle';
var dText3 = text.split(/\s*,\s*/);
var eText3 = text.split(/\s*(,)\s*/);

var f2 = 'a|b|c|'.split('/\|/');
