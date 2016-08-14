whenReady(function () {
    var BadData = new Error('Sparkline data must be numeric.');

    var sparkLines = document.getElementsByClassName('sparkLine');
    sparkLines.toArray().forEach(function (sparkLine) {
        try {
            var data = extractData(sparkLine);
            var appearance = computeAppearance(sparkLine, data.numbers);
            
            var canvas = createCanvas(data.content, appearance);
            sparkLine.innerHTML = '';
            sparkLine.appendChild(canvas);
            plotPoints(canvas, appearance, data.numbers);
        } 
        catch (e) {
            console.error('Data is bad in ' + sparkLine);
        }
    });
    
    function extractData(sparkLine) {
        var content = sparkLine.textContent || sparkLine.innerText;
        var text = content.replace(/#.*$/gm, '');
        text = text.replace(/[\n\r\t\v\f]/g, ' ');
        var data = text.split(/\s+|\s*,\s*/);
        for (var index = 0; index < data.length; index++) {
            data[index] = Number(data[index]);
            if (isNaN(data[index])) {
                console.log('data[index]', data[index]);
                throw new BadData;
            }
        }
        return {
            content: content,
            numbers: data
        };
    }
    
    function computeAppearance(sparkLine, data) {
            var style = getComputedStyle(sparkLine, null);
            
            var height = intFromAttr('height') || parseInt(style.fontSize) || 20;
            
            var width = intFromAttr('width') ||
                    data.length * (
                        parseInt(sparkLine.getAttribute('data-dx')) || 
                        height / 6
                    );

            var yMin = parseInt(sparkLine.getAttribute('data-ymin')) || 
                    Math.min.apply(Math, data);
            var yMax = parseInt(sparkLine.getAttribute('data-ymax')) || 
                    Math.max.apply(Math, data);
            if (yMin >= yMax) {
                yMax = yMin + 1;
            }
        
        return {
            color: style.color,
            height: height,
            width: width,
            yMin: yMin,
            yMax: yMax
        };
        
        function intFromAttr(field) {
            return parseInt(sparkLine.getAttribute('data-' + field));
        }
    }
    
    function createCanvas(content, appearance) {
        var canvas = document.createElement('canvas');
        canvas.width = appearance.width;
        canvas.height = appearance.height;
        canvas.title = content;
        return canvas;
    }

    function plotPoints(canvas, appearance, numbers) {
        var context = canvas.getContext('2d');
        var yMin = appearance.yMin;
        var yMax = appearance.yMax;
        for (var index = 0; index < numbers.length; index++) {
            var x = appearance.width * index/ numbers.length;
            var y = (yMax - numbers[index]) * appearance.height / (yMax - yMin);
            context.lineTo(x, y);
        }
        context.strokeStyle = appearance.color;
        context.stroke();
    }
});