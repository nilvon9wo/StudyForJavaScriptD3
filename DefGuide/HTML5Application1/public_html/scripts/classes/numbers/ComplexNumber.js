function ComplexNumber(real, imaginary) {
    if (isNaN(real) || isNaN(imaginary)) {
        throw new TypeError();
    }

    this.real = real;
    this.imaginary = imaginary;
}

ComplexNumber.extend({
    ZERO  : new ComplexNumber(0,0),
    ONE   : new ComplexNumber(1,0),
    I     : new ComplexNumber(0,1),
    parse : function(string){
            var _format = /^{([^,]+),([^}]+)\}$/;
        try {
            var match = _format.exec(string);
            return new ComplexNumber(parseFloat(match[1]), parseFloat(match[2]));
        }
        catch (e){
            throw new TypeError('Can\'t parse "' + string + '" as a complex number.');
        }
    },
    polar : function(radius, theta){
        return new Complex(radius * Math.cos(theta), radius * Math.sin(theta));
    }
});

ComplexNumber.extendPrototype({
    add: function (that) {
        return new ComplexNumber(
                this.real + that.real,
                this.imaginary + that.imaginary
                );
    },
    conjugate: function(){
        return new ComplexNumber(this.real, - this.imaginary);
    },
    equals: function (that) {
        return that.constructor === ComplexNumber &&
                this.real === that.real &&
                this.imaginary === that.imaginary;
    },
    magnitude: function () {
        return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
    },
    multiply: function (that) {
        return new ComplexNumber(
                this.real * that.real - this.imaginary * that.imaginary,
                this.real * that.imaginary + this.imaginary * that.real
                );
    },
    negative: function () {
        return new ComplexNumber(-this.real, -this.imaginary);
    },
    toString: function () {
        return '{' + this.real + ',' + this.imaginary + '}';
    }
});

