/* global arrayHelper */

var stooge = {
		"first-name": "Jerome",
		"last-name" : "Howard"
};

var firstName  = stooge["first-name"];
var middleName = stooge["middle-name"] || "(none)";

stooge["first-name"] = 'Jerome';
stooge["middle-name"] = 'Lester';
stooge.nickname = 'Curly';

var stoogeX = stooge;
stoogeX.nickname = 'Curly';
var nick = stooge.nickname;

var another_stooge = Object.create(stooge);
another_stooge['first-name'] = 'Harry';
another_stooge['middle-name'] = 'Moses';
another_stooge.nickname = 'Moe';

stooge.profession = 'actor';
anotherProfession = another_stooge.profession;

for (var name in another_stooge){
	if (typeof another_stooge[name] !== 'function'){
		document.writeln(name + ': ' + another_stooge[name]);
	}
}

var properties = [ 'first-name', 'middle-name', 'last-name', 'profession' ];
properties.forEach(function(property){
	document.writeln(property + ':' +  another_stooge[property]);
});

delete another_stooge.nickname;
var protoNickname = another_stooge.nickname;

var s = [
    {first: 'Joe',   last: 'Besser'},
    {first: 'Moe',   last: 'Howard'},
    {first: 'Joe',   last: 'DeRita'},
    {first: 'Shemp', last: 'Howard'},
    {first: 'Larry', last: 'Fine'},
    {first: 'Curly', last: 'Howard'}
];
s.toString = function(){
    var output = '';
    this.forEach(function(contact){
        output += contact.first + ' '  + contact.last + '\n';
    });
    return output;
};
s.sort(arrayHelper.compareBy('first'));
document.writeln("\ns:\n" + s);

s.sort(arrayHelper.compareBy('first')).sort(arrayHelper.compareBy('last'));
document.writeln("\ns:\n" + s);

s.sort(arrayHelper.compareBy('first'), arrayHelper.compareBy('last'));
document.writeln("\ns:\n" + s);

var name = 'Curly';
var initial = name.charAt(0);
var initialCode = name.charCodeAt(0);