/* global CanvasRenderingContext2D */

var degree = Math.PI / 180;

function snowflake(config) {
    config.context = config.context || 'snowflake';
    var context = CanvasRenderingContext2D.getContext(config.context);
    var levelNumber = (config.levelNumber !== null) ? config.levelNumber : 0;
    var corner = config.corner || new Point(0, 0);
    var length = config.length || 125;

    context.save();
    context.translate(corner.x, corner.y);
    context.moveTo(0, 0);

    drawLegs(levelNumber);

    context.moveTo(0, 0);
    context.closePath();
    context.restore();

    function drawLegs(levelNumber) {
        drawSubLegs(levelNumber, 3, function(){ return -120;});

        function drawLeg(levelNumber) {
            context.save();
            if (levelNumber === 0) {
                context.lineTo(length, 0);
            } else {
                context.scale(1 / 3, 1 / 3);
                drawSubLegs(levelNumber - 1, 4, function(leg){ 
                    return ((leg % 2) ? 60 : -120);
                });
            }
            context.restore();
            context.translate(length, 0);
        }
        
        function drawSubLegs(nextLevelNumber, numberOfLegs, rotationFunc) {
            for (var leg = 1; leg <= numberOfLegs; leg++) {
                drawLeg(nextLevelNumber);
                if (leg !== numberOfLegs) {
                    var rotation = rotationFunc(leg);
                    context.rotate(rotation * degree);
                }
            }
        }
    }
}

