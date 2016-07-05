function Point(x,y){
    "use strict";
    this.x = x;
    this.y = y;
}

Point.prototype.r = function(){
    "use strict";
    return Math.sqrt(
        this.x * this.x +
            this.y * this.y
    );
};

var point = new Point(1, 1);

