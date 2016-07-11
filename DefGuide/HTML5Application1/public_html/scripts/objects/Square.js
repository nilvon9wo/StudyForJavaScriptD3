var Square = function (upperLeft, sideLength){
    this.upperLeft = upperLeft;
    lowerRight = new Point(upperLeft.x + sideLength, upperLeft.y + sideLength);
};

var point = new Point(2.3, -1.2);
var side = 1;
var square = new Square (point, side);
