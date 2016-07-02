var foo = function(){
	var a = 3;
	var b = 5;

	var bar = function(){
		var b = 7;
		var c = 11;
		a += b + c;
	};
	
	bar();
};