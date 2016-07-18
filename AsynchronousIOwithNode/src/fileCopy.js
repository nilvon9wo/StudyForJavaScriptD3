var fs = require('fs');

function fileCopy(filename1, filename2, done){
	var input = fs.createReadStream(filename1);
	var output = fs.createWriteStream(filename2);
	
	input.on('data', function(data){
		output.write(data);
	});
	input.on('error', function(err){
		throw(err);
	});
	input.on('end', function(){
		output.end();
		if (done){
			done();
		}
	});
}
