var Shape = function shape(){
    return {
        setX : function(x){ shape.x = x; return this; },
        setY : function(y){ shape.y = y; return this; },
        setSize : function(size){ shape.size = size; return this; },
        setOutline: function(color) { shape.outline = color; return this; },
        setFill: function(color) { shape.outline = color; return this; },
        draw: function (){
            // ....
            return this;
        }
    };
};

var shape = new Shape();
shape.setX(100)
        .setY(100)
        .setSize(50)
        .setOutline('red')
        .setFill('blue')
        .draw();