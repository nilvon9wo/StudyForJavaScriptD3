/* global parseFloat */

function drawSparkline(index, ymin, yman, data){
    console.warn('drawSparkline', index, ymin, yman, data);
}

function extractFloat(dataset, element, target){
    return parseFloat(dataset && dataset[target] || element.getAttribute('data-' + target));
}

var arrayApply = function (methodName, nodeList) {
    var args = arguments.toArray().splice(0, 2);
    return nodeList.toArray()[methodName](args);
};

var section1 = document.getElementById('section1');
var radiobuttons = document.getElementsByName('favourite_color');

var form = document.forms[0];
form.action = 'http://www.example.com/submit.php';
form.method = 'POST';
var shippingAddress = document.shipping_address || form.shipping_address;

var spans = document.getElementsByTagName('span');

var paragraphs = document.getElementsByTagName('p');
var firstParagraph = paragraphs[0];
var firstParagraphSpans = firstParagraph.getElementsByTagName('span');
var paragraphContent = arrayApply('map', paragraphs, function(element) {
    return element.innerHTML;
});
var paragraphSnapshot = arrayApply('slice', paragraphContent, 0);
var text = firstParagraph.textContent;
firstParagraph.textContent = 'Hello, World!';

var warnings = document.getElementsByClassName('warning');
var log = document.getElementById('log');
var fatal = log.getElementsByClassName('fatal error');

for (var index = 0; index < document.images.length; index++) {
    document.images[index].style.display = 'none';
}
var image = document.getElementById('myimage') || document.images[0];
image.setAttribute('class', 'thumbnail');
var imgUrl = image.src;
var width = parseInt(image.getAttribute('WIDTH'));

var sparklines = document.getElementsByClassName('sparkline');
for (var index = 0; index < sparklines.length; index++) {
    var element = sparklines[index];
    var dataset = element.dataset;
    var ymin = extractFloat(dataset, element, 'ymin');
    var ymax = extractFloat(dataset, element, 'ymax');
    var points = element.getAttribute('data-points');
    var data = element.textContent.split(' ').map(parseFloat);
    drawSparkline(element, ymin, ymax, data);
}

