var serialNumberGenerator = {
    $number: 0,
    get next() { return this.$number++; },
    set next(number){
        'use strict';
        if (number >= this.$number){
            this.$number = number;
        }
        else {
            throw "Serial number can only be set to a larger currentValue";
        }
    }
};