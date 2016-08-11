function pieChart(config) {
    var data = config.data || new Error('Data is required!');
    var width = config.width || 640;
    var height = config.height || 400;
    var center = config.center || new Point(200, 200);
    var radius = config.radius || 150;
    var colors = config.colors ||
            ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
    var labels = config.labels;
    var legend = config.legend || new Point(400, 100);

    var svgNs = 'http://www.w3.org/2000/svg';
    var total = getDataTotal();
    var angles = calculateAngles();
    var wedges = createWedges();
    return createChart(wedges);

    function createChart(wedges) {
        var chart = document.createElementNS(svgNs, 'svg');
        chart.setAttribute('xmlns', svgNs);
        chart.setAttribute('xmlns:svg', svgNs);
        chart.setAttribute('width', width);
        chart.setAttribute('height', height);
        chart.setAttribute('viewBox', '0 0 ' + width + ' ' + height);

        wedges.forEach(function (wedge) {
            chart.appendChild(wedge.path);
            chart.appendChild(wedge.icon);
            chart.appendChild(wedge.label);
        });

        return chart;
    }

    function getDataTotal() {
        var total = 0;
        data.forEach(function (item) {
            total += item;
        });
        return total;
    }

    function calculateAngles() {
        var angels = [];
        data.forEach(function (item, index) {
            angels[index] = item / total * Math.PI * 2;
        });
        return angels;
    }

    function createWedges() {
        var wedges = [];
        var startAngle = 0;
        var endAngle;
        for (var index = 0; index < data.length; index++) {
            endAngle = startAngle + angles[index];

            var wedgeIntersections = getWedgeIntersections(startAngle, endAngle);
            var isBig = isLargerThanHalfCircle(startAngle, endAngle);
            var details = getDetails(wedgeIntersections, isBig);
            var colorIndex = index % colors.length;

            wedges.push({
                path: createPath(details, colorIndex),
                icon: createIcon(index, colorIndex),
                label: createLabel(index)
            });
        
            startAngle = endAngle;
        }
        return wedges;

        function getWedgeIntersections(startAngle, endAngle) {
            function getX(angle) {
                return center.x + radius * Math.sin(angle);
            }
            function getY(angle) {
                return center.y - radius * Math.cos(angle);
            }

            wedgeIntersections = {
                point1: new Point(getX(startAngle), getY(startAngle)),
                point2: new Point(getX(endAngle), getY(endAngle))
            };
            return wedgeIntersections;
        }

        function isLargerThanHalfCircle(startAngle, endAngle) {
            return (endAngle - startAngle > Math.PI);
        }

        function getDetails(wedgeIntersections, isBig) {
            var point1 = wedgeIntersections.point1;
            var point2 = wedgeIntersections.point2;

            return 'M ' + center.commaSeparated +
                    ' L ' + point1.commaSeparated +
                    ' A ' + radius + ',' + radius +
                    ' 0 ' + (isBig + 0) +
                    ' 1 ' + point2.commaSeparated +
                    ' Z';
        }

        function createPath(details, colorIndex) {
            var path = document.createElementNS(svgNs, 'path');
            path.setAttribute('d', details);
            setAppearance(path, colorIndex);
            return path;
        }

        function createIcon(index, colorIndex) {
            var icon = document.createElementNS(svgNs, 'rect');
            setPosition(icon, new Point(legend.x, legend.y + 30 * index));
            icon.setAttribute('width', 20);
            icon.setAttribute('height', 20);
            setAppearance(icon, colorIndex);
            return icon;
        }

        function createLabel(index) {
            var label = document.createElementNS(svgNs, 'text');
            
            var labelX = legend.x + 30;
            var labelY = legend.y + 30 * index + 18;
            setPosition(label, new Point(labelX, labelY));
            
            label.setAttribute('font-family', 'sans-serif');
            label.setAttribute('font-size', '16');

            var textLabel = (labels && labels[index]) || ('Item ' + (index + 1));
            label.appendChild(document.createTextNode(textLabel));
            
            return label;
        }

        function setPosition(element, point) {
            element.setAttribute('x', point.x);
            element.setAttribute('y', point.y);
        }

        function setAppearance(element, colorIndex) {
            element.setAttribute('fill', colors[colorIndex]);
            element.setAttribute('stroke', 'black');
            element.setAttribute('stroke-width', '2');
        }
    }
}
