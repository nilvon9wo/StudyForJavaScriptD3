Number.method('integer', function(){
	var which = this < 0 ? 'ceil' : 'floor';
	return Math[which](this);
});

