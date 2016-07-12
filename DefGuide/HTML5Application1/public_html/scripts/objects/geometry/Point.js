function Point(_x, _y){
    "use strict";
    return Object.defineProperties({}, {
        x: { value: _x, writeable: true, enumerable: true, configurable: true },        
        y: { value: _y, writeable: true, enumerable: true, configurable: true },        
        radius: {
            get: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y);
            },
            set: function(newValue) {
                var oldValue = this.radius;
                var ratio = newValue/oldValue;
                this.x *= ratio;
                this.y *= ratio;
            },
            enumerable: true,
            configurable: true
        },
        theta: {
            get: function() {
                return Math.atan2(this.y, this.x); 
            }
        }
    });
}

var point = new Point(1, 1);

