function tail(obj) {
    'use strict';
    for (; obj.next; obj = obj.next) { /* empty */ }

    return obj;
}