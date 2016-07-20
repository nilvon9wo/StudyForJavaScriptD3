function oddSums(n){
	let total = 0;
	let result = [];
	for (let x = 1; x <= n; x++){
		let odd = 2 * x - 1;
		total += odd;
		result.push(total);
	}
	return result;
}

console.log('result', oddSums(32));
