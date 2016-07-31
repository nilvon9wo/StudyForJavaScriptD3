var element = document.getElementById('young');
element.style.fontSize = '24pt';
element.style.fontWeight = 'bold';
element.style.color = 'blue';
element.style.fontFamily = 'sans-serif';
element.style.position = 'absolute';
element.style.backgroundColor = '#ffffff';
element.style.left = '300px';

var x0;
var leftMargin;
var topMargin;
var rightMargin;
var bottomMargin;

var leftBorder;
var leftPadding;
var leftValue = (x0 + leftMargin + leftBorder + leftPadding);

element.style.left = leftValue + 'px';
element.style.margin = topMargin + 'px ' + rightMargin + 'px ' + bottomMargin + 'px ' + leftMargin + 'px';
element.style.marginTop = topMargin + 'px';
element.style.marginRight = topMargin + 'px';
element.style.marginBottom = bottomMargin + 'px';
element.style.marginLeft = leftMargin + 'px';

var cssString = element.getAttribute('style');
cssString = element.style.cssText;
element.setAttribute('style', cssString);


var title = document.getElementById('sectionTitle');
var titleStyles = window.getComputedStyle(element, null);

var styleSheet0 = document.styleSheets[0];
var firstRule = styleSheet0.cssRules[0];
styleSheet0.insertRule('H1 { text-weight: bold; }', 0);

var rules = styleSheet0[styleSheet0.cssRules ? 'cssRules' : 'rules'];
for (var index = 0; index < rules.length; index++) {
    var rule = rules[index];
    if (rule.selectorText) {
        var selector = rule.selectorText;
        var ruleText = rule.style.cssText;
        
        if (selector === 'h1') {
            if (styleSheet0.insertRule) {
                styleSheet0.insertRule('h2 {' + ruleText + '}', rules.length);
            } else {
                if (styleSheet0.addRule) {
                    styleSheet0.addRule('h2', ruleText, rules.length);
                }
            }
        }
        
        if (rule.style.textDecoration) {
            if (styleSheet0.deleteRule) {
                styleSheet0.deleteRule(index);
            } else if (styleSheet0.removeRule) {
                styleSheet0.removeRule(index);
            }
            index--;
        }
    }
}
