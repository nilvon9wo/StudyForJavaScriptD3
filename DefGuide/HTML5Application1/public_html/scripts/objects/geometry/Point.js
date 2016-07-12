function Point(_x, _y){
    "use strict";

    return {
        x : _x,
        y : _y,
        get radius(){
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        set radius(newValue){
            var oldValue = this.radius;
            var ratio = newValue/oldValue;
            this.x *= ratio;
            this.y *= ratio;
        },
        get theta(){
            return Math.atan2(this.y, this.x);
        }
    }
}

var point = new Point(1, 1);

