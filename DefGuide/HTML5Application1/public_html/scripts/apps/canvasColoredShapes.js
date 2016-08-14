/* global CanvasRenderingContext2D */

var withCanvas = CanvasRenderingContext2D.with2dCanvas.bind(CanvasRenderingContext2D);

withCanvas('square', function (context) {
    context.fillStyle = '#f00';
    context.fillRect(0, 0, 10, 10);
});

withCanvas('circle', function (context) {
    context.beginPath();
    context.arc(5, 5, 5, 0, 2 * Math.PI, true);
    context.fillStyle = '#00f';
    context.fill();
});

var offscreen = document.createElement('canvas');
offscreen.width = 10;
offscreen.height = 10;
var offscreenContext = offscreen.getContext('2d');
offscreenContext.strokeRect(0, 0, 6, 6);
var offScreenPattern = offscreenContext.createPattern(offscreen, 'repeat');
var offScreenPattern;

withCanvas('polygon', function (context) {
    context.beginPath();
    context.moveTo(100, 100);
    context.lineTo(200, 200);
    context.lineTo(100, 200);
    context.moveTo(300, 100);
    context.lineTo(300, 200);
    context.attr({
        fillStyle: offScreenPattern,
        lineWidth: 5
    })
            .fill();
    context.stroke();
});

var multiplePolygonsContext = CanvasRenderingContext2D.get2dCanvasContextByElementId('multiplePolygons');

CanvasRenderingContext2D.createTriangle({
    context: multiplePolygonsContext,
    centerPoint: new Point(50, 70)
});

CanvasRenderingContext2D.createSquare({
    context: multiplePolygonsContext,
    centerPoint: new Point(150, 60)
});

CanvasRenderingContext2D.createPentagon({
    context: multiplePolygonsContext,
    centerPoint: new Point(255, 55)
});

CanvasRenderingContext2D.createHexagon({
    context: multiplePolygonsContext,
    centerPoint: new Point(365, 53)
});

CanvasRenderingContext2D.createSquare({
    context: multiplePolygonsContext,
    centerPoint: new Point(365, 53),
    radius: 20,
    isCounterClockwise: true
});

var colors = [
    "#f44", // Hexadecimal RGB value: red
    "#44ff44", // Hexadecimal RRGGBB value: green
    "rgb(60, 60, 255)", // RGB as integers 0-255: blue
    "rgb(100%, 25%, 100%)", // RGB as percentages: purple
    "rgba(100%, 25%, 100%, 0.5)", // RGB plus alpha 0-1: translucent purple
    "rgba(0,0,0,0)", // Completely transparent black
    "transparent", // Synonym for the above
    "hsl(60, 100%, 50%)", // Fully saturated yellow
    "hsl(60, 75%, 50%)", // Less saturated yellow
    "hsl(60, 100%, 75%)", // Fully saturated yellow, lighter
    "hsl(60, 100%, 25%)", // Fully saturated yellow, darker
    "hsla(60, 100%, 50%, 0.5)"    // Fully saturated yellow, 50% opaque
];

function randomColor() {
    return colors[Math.floor((Math.random() * (colors.length - 1)))];
}
withCanvas('snowflake', function (context) {
    snowflake({levelNumber: 0, corner: new Point(5, 115)});
    snowflake({levelNumber: 1, corner: new Point(145, 115)});
    snowflake({levelNumber: 2, corner: new Point(285, 115)});
    snowflake({levelNumber: 3, corner: new Point(425, 115)});
    snowflake({levelNumber: 4, corner: new Point(565, 115)});

    var circle = document.getElementById('circle');
    context.attr({
        fillStyle: context.createPattern(circle, 'repeat'),
        strokeStyle: randomColor()
    });
    context.stroke();
    context.fill();
});

function radians(degrees) {
    return Math.PI * degrees / 180;
}

var bgFade;
withCanvas('bg', function (context, canvas) {
    bgFade = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgFade.addColorStop(0.0, '#88f');
    bgFade.addColorStop(1.0, '#fff');
});

var peekhole;
withCanvas('peekhole', function (context) {
    peekhole = context.createRadialGradient(300, 300, 100, 300, 300, 300);
    peekhole.addColorStop(0.0, 'transparent');
    peekhole.addColorStop(0.7, 'rgba(100, 100, 100, .9)');
    peekhole.addColorStop(1.0, 'rgba(0, 0, 0, 0)');
});

withCanvas('multipleCurves', function (context) {
    context.beginPath();
    context.arc(75, 100, 50, 0, radians(360), false);
    context.moveTo(200, 100);
    context.arc(200, 100, 50, radians(-60), 0, false);
    context.closePath();
    context.moveTo(325, 100);
    context.arc(325, 100, 50, radians(-60), 0, true);
    context.closePath();
    context.moveTo(450, 50);
    context.arcTo(500, 50, 500, 150, 30);
    context.arcTo(500, 150, 400, 150, 20);
    context.arcTo(400, 150, 400, 50, 10);
    context.arcTo(400, 50, 500, 50, 0);
    context.closePath();
    context.moveTo(75, 250);
    context.quadraticCurveTo(100, 200, 175, 250);
    context.fillRect(97, 197, 6, 6);
    context.moveTo(200, 250);
    context.bezierCurveTo(220, 220, 280, 280, 300, 250);
    context.fillRect(117, 117, 6, 6);
    context.fillRect(277, 277, 6, 6);

    context.attr({
        fillStyle: bgFade,
        strokeStyle: peekhole,
        lineWidth: 50
    });

    context.fill();
    context.stroke();
});


withCanvas('bgAndPeekhole', function (context) {
    context.fillStyle = bgFade;
    context.fillRect(0, 0, 600, 600);
    context.strokeStyle = offScreenPattern;
    context.lineWidth = 100;
    context.strokeRect(100, 100, 400, 400);
    context.fillStyle = peekhole;
    context.fillRect(0, 0, 600, 600);
});

withCanvas('complexClipping', function (context) {
    context.attr({
        font: 'bold 60pt sans-serif',
        lineWidth: 2
    });
    createRectangle('stroke');
    createText('stroke', '#000');
    createTriangle(200);

    createTriangle(100, true);
    context.clip();

    context.lineWidth = 10;
    context.stroke();
    createRectangle('fill', '#aaa');
    createText('fill', '#888');

    function createRectangle(type, style) {
        if (style) {
            context[type + 'Style'] = '#aaa';
        }
        context[type + 'Rect'](175, 25, 50, 325);
    }

    function createText(type, style) {
        context[type + 'Rect'](175, 25, 50, 325);
        context[type + 'Style'] = style;
        context[type + 'Text']('<canvas>', 15, 330);
    }

    function createTriangle(radius, isCounterClockwise) {
        config = {
            context: context,
            centerPoint: new Point(200, 225),
            radius: radius,
            isCounterClockwise: isCounterClockwise
        };

        CanvasRenderingContext2D.createTriangle(config);
    }
});

withCanvas('shadowWorld', function (context, canvas) {
    context.attr({
        lineWidth: 10,
        shadowColor: 'rgba(100, 100, 100, .4)',
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 5,
        strokeStyle: 'blue'
    });
    context.strokeRect(100, 100, 300, 200);

    context.font = 'Bold 36pt Helvetica';
    context.fillText('Hello World', 115, 225);

    context.attr({
        fillStyle: 'red',
        shadowOffsetX: 20,
        shadowOffsetY: 20,
        shadowBlur: 10
    });
    context.fillRect(50, 25, 200, 65);

    context.smear({
        n: 10,
        point: new Point(100, 100),
        width: 600,
        height: 600
    });

    canvas.onclick = function(event) {
        if (context.hitPath(event)) {
            alert ('Hit Path!');
        }
    };

    canvas.onclick = function(event) {
        if (context.hitPaint(event)) {
            alert('Hit Paint!');
        }
    };
});

withCanvas('pixelatedSegment', function (context, canvas) {
    context.moveTo(5, 5);
    context.lineTo(48, 45);
    context.attr({
        lineWidth: 8,
        lineCap: 'round'
    });
    context.stroke();

    context.translate(50, 100);
    context.rotate(-45 * Math.PI / 180);
    context.scale(10, 10);

    context.drawImage(canvas, 0, 0, 50, 50, 0, 0, 50, 50);

    var img = document.createElement('img');
    img.src = canvas.toDataURL();
    document.body.appendChild(img);
    
    canvas.onclick = function(event) {
        if (context.hitpath(event)) {
            alert ('Hit!');
        }
    };
});

