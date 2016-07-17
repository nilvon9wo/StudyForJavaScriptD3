/* Firefox ONLY */

if (window.Iterator) {

    function* fibonacci(){
        let x = 0;
        let y = 1;
        while (true) {
                yield y;
                [x,y] = [y, x+y];
            }
    }

    var gen = fibonacci();

    for (let index = 0; index < 10; index++){
        console.log(gen.next().value); // 0
    }
    
    gen.return();
}