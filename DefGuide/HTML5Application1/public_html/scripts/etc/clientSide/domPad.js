/* global parseFloat */

function drawSparkline(index, ymin, yman, data) {
    console.warn('drawSparkline', index, ymin, yman, data);
}

function extractFloat(dataset, element, target) {
    return parseFloat(dataset && dataset[target] || element.getAttribute('data-' + target));
}

function writeParagraph(text) {
    document.write('<p>' + text + '</p>');
}

function writeObject(obj) {
    var objectAsString = '';
    for (var property in obj) {
        objectAsString += '<br />' + property + ': ' + obj[property];
    }
    writeParagraph(objectAsString);
}

function bold() {
    document.execCommand('bold', false, null);
}

function link(){
    var url = prompt('Enter link destination');
    if (url) {
        document.execCommand('createLink', false, url);
    }
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
var paragraphContent = arrayApply('map', paragraphs, function (element) {
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

var newNode = document.createTextNode('text node content');
var fragment = document.createDocumentFragment();

var fields = document.getElementById('address').getElementsByTagName('input');
var shippingRadioButtons = document.querySelectorAll('#shipping input[type="radio"]');
var shippingMethodRadionButtons = document.querySelectorAll('#shipping input[type="radio"][name="method"]');
var shippingMethodInputElements = document.forms.shipping.elements.shippingMethod;

var selectedShippingMethod;
for (var index = 0; index < shippingMethodInputElements.length; index++) {
    if (shippingMethodInputElements[index].checked) {
        selectedShippingMethod = shippingMethodInputElements[index].value;
    }
}

var zaire = new Option('Zaire', 'Zaire', false, false);
var countries = document.shipping.country;
countries.options[countries.options.length] = zaire;

var ref = document.referred;
if (ref && ref.indexOf('http://wwww.google.com/search?') === 0) {
    var args = ref.substring(ref.indexOf('?') + 1).split('&');
    for (var index = 0; index < args.length; index++) {
        if (args[index].substring(0, 2) === 'q=') {
            writeParagraph('Welcome Google user.');
            writeParagraph('You searched for: ' +
                    unescape(args[index].substring(2)).replace('+', ' ')
                    );
            break;
        }
    }
}

writeObject({
    'Document title': document.title,
    'URL': document.URL,
    'Referred by': document.referrer,
    'Modified on': document.lastModified,
    'Accessed on': new Date()
});

window.onload = function() {
    var iframeEditor = document.getElementById('iframeEditor');
    iframeEditor.contentDocument.designMode = 'on';
};
