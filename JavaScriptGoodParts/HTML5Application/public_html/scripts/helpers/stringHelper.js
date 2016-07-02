String.method('deentityify', function(){
	var entity = {
		quot: '"',
		lt:   '<',
		gt:   '>'
	};
	
	return function(){
		return this.replace(/&[^&;]+/g, function(a,b){
			var replacement = entity[b];
			return typeof replacement === 'string' 
                            ? replacement 
                            : a;
		});
	};
}());

String.method('trim', function(){
	return this.replace(/^\s+|\s+$/g, '');
});

