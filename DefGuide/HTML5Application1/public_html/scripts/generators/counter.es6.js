function counter(start){
    let nextValue = Math.round(start);
    return {
        next: function(){ 
            return nextValue++;
        } 
    };
}

let serialNumberGenerator = counter(1000);
let serialNumber1 = serialNumberGenerator.next();
let serialNumber2 = serialNumberGenerator.next();