var si = true;
var pi = 3.14;

var b = 4;

var x = .3 - .2;
var f = undefined;
var y = x + f;

var a = {value:3};
(a.value + b).toString();
a.sort();

y = .2 - .1;

var then = new Date(2010, 0, 1);
var later = new Date(2010, 0, 1, 17, 10, 30);
var now = new Date();
var elapsed = now - then;

var message = 'Hello, ' + 'world';
var name = 'Brian';
var greeting = 'Welcome to my blog, ' + ' ' + name;
var string = 'hello, world';

var text = 'testing: 1, 2, 3';
var pattern = /\d+/g;
pattern.test(text);
text.search(pattern);
text.match(pattern);
text.replace(pattern, '#');
text.split(/\D+/);
