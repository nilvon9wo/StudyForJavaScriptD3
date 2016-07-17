/* global nextValue, StopIteration */

function rangeIterator(first, last){
    let nextValue = Math.ceil(first);
    return {
        next: function(){
            if (nextValue > last){
                throw StopIteration;
            }
            return nextValue++;
        }
    };
}

let range = rangeIterator(1,5);
while(true){
    try {
        console.log(range.next());
    }
    catch(e){
        if (e === StopIteration){
            break;
        }
        else {
            throw e;
        }
    }
}

