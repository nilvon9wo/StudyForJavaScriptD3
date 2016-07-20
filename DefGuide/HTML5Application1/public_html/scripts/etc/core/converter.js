function convert(x){
    'use strict';
    switch (typeof  x){
        case 'number': return x.toString(16);
        case 'string': return '"' + x + '"';
        default: return String(x);
    }
}