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
properties.foreach(function(property){
	document.writeln(property + ':' +  another_stooge[property]);
});

delete another_stooge.nickname;
var protoNickname = another_stooge.nickname;