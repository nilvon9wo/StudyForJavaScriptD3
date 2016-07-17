/* Firefox ONLY */
if (window.Iterator) {
    
    function* generatorRange(min, max){
        for (
                let index = Math.ceil(min); 
                index <= max; 
                index++
            ){
                yield index;
            }
    }

    var gen = generatorRange(3, 8);
    for (let value of gen){
        console.log('value: ', value);
    }
}

