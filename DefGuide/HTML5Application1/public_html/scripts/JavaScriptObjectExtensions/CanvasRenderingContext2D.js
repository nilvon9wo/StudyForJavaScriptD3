/* global CanvasRenderingContext2D */
CanvasRenderingContext2D.get2dCanvasContextByElementId =
        CanvasRenderingContext2D.get2dCanvasContextByElementId ||
        function (id) {
            var canvas = document.getElementById(id);
            var context = canvas.getContext('2d');
            return context;
        };

CanvasRenderingContext2D.getContext =
        CanvasRenderingContext2D.getContext ||
        function (_context) {
            if (Object.classOf(_context) === 'CanvasRenderingContext2D') {
                return _context;
            } else if (typeof _context === 'string') {
                return this.get2dCanvasContextByElementId(_context);
            } else {
                throw new Error('Context is required');
            }
        };

CanvasRenderingContext2D.getVertex =
        CanvasRenderingContext2D.getVertex ||
        function (centerPoint, radius, angle) {
            var vertex = new Point(
                    centerPoint.x + radius * Math.sin(angle),
                    centerPoint.y - radius * Math.cos(angle)
                    );
            return vertex;
        };
CanvasRenderingContext2D.createPolygon =
        CanvasRenderingContext2D.createPolygon ||
        function (config) {
            var self = this;
            var context = this.getContext(config.context);
            var numberOfSides = config.numberOfSides || 1;
            var centerPoint = config.centerPoint || new Point(50, 50);
            var radius = config.radius || 50;
            var angle = config.angle || 0;
            var graphicAttributes = config.graphicAttributes || {
                fillStyle: '#ccc',
                strokeStyle: '#008',
                lineWidth: 5
            };
            var isCounterClockwise = config.isCounterClockwise || false;
            var isFilled = config.isFilled || true;
            var isStroked = config.isStroked || true;

            var vertex = _getVertex(angle);
            context.moveTo(vertex.x, vertex.y);
            var delta = 2 * Math.PI / numberOfSides;
            for (var side = 1; side < numberOfSides; side++) {
                angle += isCounterClockwise ? -delta : delta;
                vertex = _getVertex(angle);
                context.lineTo(vertex.x, vertex.y);
            }
            context.closePath();
            context.attr(graphicAttributes);

            if (isFilled) {
                context.fill();
            }
            if (isStroked) {
                context.stroke();
            }

            function _getVertex() {
                return self.getVertex(centerPoint, radius, angle);
            }

        };
CanvasRenderingContext2D.createTriangle =
        CanvasRenderingContext2D.createTriangle ||
        function (config) {
            config.numberOfSides = 3;
            this.createPolygon(config);
        };
CanvasRenderingContext2D.createSquare =
        CanvasRenderingContext2D.createSquare ||
        function (config) {
            config.numberOfSides = 4;
            config.angle = Math.PI / 4;
            this.createPolygon(config);
        };
CanvasRenderingContext2D.createPentagon =
        CanvasRenderingContext2D.createPentagon ||
        function (config) {
            config.numberOfSides = 5;
            this.createPolygon(config);
        };
CanvasRenderingContext2D.createHexagon =
        CanvasRenderingContext2D.createHexagon ||
        function (config) {
            config.numberOfSides = 6;
            config.angle = Math.PI / 6;
            this.createPolygon(config);
        };
CanvasRenderingContext2D.with2dCanvas =
        CanvasRenderingContext2D.with2dCanvas ||
        function (id, func) {
            var context = this.get2dCanvasContextByElementId(id);
            func(context, context.canvas);
        };

CanvasRenderingContext2D.method('revert', function () {
    this.restore();
    this.save();
    return this;
});

CanvasRenderingContext2D.method('attr', function (attributes) {
    if (attributes) {
        for (var attribute in attributes) {
            this[attribute] = attributes[attribute];
        }
        return this;
    } else {
        return this.getCurrentAttributes();
    }
});

CanvasRenderingContext2D.method('getCurrentAttributes', function (attributes) {
    var attributes = {};
    var supportedAttributes = [
        'fillStyle', 'font', 'globalAlpha', 'globalCompositeOperation', 'lineCap',
        'lineJoin', 'lineWidth', 'miterLimit', 'textAlign', 'textBaseline',
        'shadowBlur', 'shadowColor', 'shadowColor', 'shadowOffsetX', 'shadowOffsetY',
        'strokeStyle'
    ];
    supportedAttributes.forEach(function (attribute) {
        attributes[attribute] = this[attribute];
    });
    return attributes;
});

CanvasRenderingContext2D.method('hit', function (event, isHit) {
    var canvas = this.canvas;
    var boundingBox = this.canvas.getBoundingClientRect();
    
    var x = (event.clientX-boundingBox.left) * (canvas.width/boundingBox.width);
    var y = (event.clientY-boundingBox.top) * (canvas.height/boundingBox.height);
    
    var _hit = isHit(x, y);
    console.log(_hit);
    return _hit;
});

CanvasRenderingContext2D.method('hitPaint', function (event) {
    var self = this;
    return this.hit(event, function(x, y){
        var pixels = self.getImageData(x, y, 1, 1);
        for (var index = 3; index < pixels.data.length; index += 4) {
            if (pixels.data[index] !== 0) {
                console.log(pixels.data[index]);
                return true;
            }
        }
        return false;
    });
});

CanvasRenderingContext2D.method('hitPath', function (event) {
    var self = this;
    return this.hit(event, function(x, y){
        return self.isPointInPath(x,y);
    });
});

CanvasRenderingContext2D.method('shear', function (point) {
    this.transform(1, point.y, point.x, 1, 0, 0);
    return this;
});

CanvasRenderingContext2D.method('smear', function (config) {
    var n = config.n || n;
    if (n < 2) {
        throw new Error ('n must be at least two');
    }
    var point = config.point || new Point(0,0);
    var configWidth = config.width || 0;
    var configHeight = config.height || 0;
    
    var pixels = this.getImageData(point.x, point.y, configWidth, configHeight);
    var width = pixels.width;
    var height = pixels.height;
    var data   = pixels.data;
    
    var m = n - 1;
    
    for(var row = 0; row < height; row++) {
        var index = row * width * 4 + 4;
        for (var column = 1; column < width; column++, index +=4) {
            transcribe(index, 0);
            transcribe(index, 1);
            transcribe(index, 2);
            transcribe(index, 3);
        }
    }
    
    this.putImageData(pixels, point.x, point.y);
    
    return this;
    
    function transcribe(index, diff){
        data[index+diff] = (data[index+diff] + data[index-4-diff] * m)/n;
    }
});

CanvasRenderingContext2D.method('rotateAbout', function (theta, point) {
    var cosOfTheta = Math.cos(theta);
    var sinOfTheta = Math.sin(theta);
    var x = point.x;
    var y = point.y;
    this.transform(
            cosOfTheta, -sinOfTheta, -sinOfTheta, cosOfTheta,
            -x * cosOfTheta - y * sinOfTheta + x,
            x & sinOfTheta - y * cosOfTheta + y
            );
    return this;
});