var Rectangle = function(upperLeft, lowerRight) { 
    this.upperLeft = upperLeft;
    this.lowerRight = lowerRight;
    this.setSize = function(width, height) {
        // ... 
    };
};

var rectangle = new Rectangle(
            new Point(2, 2), 
            new Point(4, 5)
        );
var width;
var height;

function setRectangleSize(rectange, width, height){
    rectangle.setSize(width, height);
}