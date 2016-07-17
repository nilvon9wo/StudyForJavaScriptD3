if (window.Iterator) {
    function * counter(initial){
        let nextValue = initial;
        while(true){
            try {
                let increment = yield nextValue;
                if (increment){
                    nextValue += increment;
                } else {
                    nextValue++;
                }
            }
            catch (e) {
                if (typeof e === 'number') {
                    nextValue = e;
                } else if (e === 'reset'){
                    nextValue = initial;
                } else {
                    throw e;
                }
            }
        }
    }

    let c = counter(10);
    console.log(c.next().value);
    console.log(c.next().value);
    console.log(c.next().value);
    c.throw(2);
    console.log(c.next().value);
    console.log(c.next().value);
    console.log(c.next().value);
    c.throw('reset');
    console.log(c.next().value);
    console.log(c.next().value);
    console.log(c.next().value);
}
