/* global Function */
function Range(from, to) {
    this.from = from;
    this.to = to;
}

Range.byLowerBound = function (a, b) {
    return a.compareTo(b);
};

Range.extendPrototype({
    constructor: Range,
    compareTo: function (that) {
        if (!(that instanceof Range)) {
            throw new Error('Can\'t compare a Range with ' + that);
        }
        return this.from - that.from || this.to - that.to;
    },
    equals: function (that) {
        if (!that) {
            return false;
        }
        if (that.constructor !== Range) {
            return false;
        }
        return this.from === that.from &&
                this.to === that.to;
    },
    forEach: function (func) {
        for (var x = Math.ceil(this.from); x <= this.to; x++) {
            func(x);
        }
    },
    includes: function (x) {
        return this.from <= x && x <= this.to;
    },
    toString: function () {
        return '(' + this.from + '...' + this.to + ')';
    }
});