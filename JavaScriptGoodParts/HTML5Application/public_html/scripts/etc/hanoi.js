var hanoi = function (disc, source, auxiliary, destination){
	if (disc > 0){
		hanoi(disc - 1, source, destination, auxiliary);
		document.writeln('Move disc ' + disc + ' from ' + source + ' to ' + destination);
		hanoi(disc - 1, auxiliary, source, destination);
	}
};