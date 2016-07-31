var cssHelper = {
    shake: function (element, onComplete, distance, time) {
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        time = time || 500;
        distance = distance || 5;

        var originalStyle = element.style.cssText;
        element.style.position = 'relative';
        var start = (new Date()).getTime();
        animate();

        function animate() {
            var now = (new Date()).getTime();
            var elapsed = now - start;
            var fraction = elapsed / time;

            if (fraction < 1) {
                var x = distance * Math.sin(fraction * 4 * Math.PI);
                element.style.left = x + "px";
                setTimeout(animate, Math.min(25, time - elapsed));
            } else {
                element.style.cssText = originalStyle;
                if (onComplete) {
                    onComplete(element);
                }
            }
        }
    },
    fadeOut: function (element, onComplete, time) {
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        time = time || 500;

        var ease = Math.sqrt;
        var start = (new Date()).getTime();
        animate();

        function animate() {
            var elapsed = (new Date()).getTime() - start;
            var fraction = elapsed / time;

            if (fraction < 1) {
                var opacity = 1 - ease(fraction);
                element.style.opacity = String(opacity);
                setTimeout(animate, Math.min(25, time - elapsed));
            } else {
                element.style.opacity = "0";
                if (onComplete) {
                    onComplete(element);
                }
            }
        }
    }, 
    scale: function(element, factor){
        var size = parseInt(window.getComputedStyle(element, '').fontSize);
        element.fontSize = factor * size + 'px';
    },
    scaleColor: function(element, factor){
        var color = window.getComputedStyle(element, '').backgroundColor;
        var components = color.match(/[\d\.]+/g);
        for (var index = 0; index < 3; index++){
            var x = Number(components[index] * factor);
            x = Math.round(Math.min(Math.max(x,0), 255));
            components[index] = String(x);
        }
        
        var type = 'rgb' + (components.length === 4) ? 'a' : '';
        element.style.background = type + '(' + components.join() + ')';
    }, 
    grabAttention: function(element){
        element.className = 'attention';
    },
    releaseAttention: function(element){
        element.className = '';
    },
    disableStylesheet: function(styleSheet){
        if (typeof styleSheet === 'number'){
            document.styleSheet[styleSheet].disabled = true;
        } else {
            var sheets = document.querySelectorAll(styleSheet);
            for (var index = 0; index < sheets.length; index++) {
                sheets[index].disabled = true;
            }
        }
    },
    addStyles: function(styles){
        var styleElement;
        var styleSheet;
        if (document.createStyleSheet){
            styleSheet = document.createStyleSheet();
        } else {
            var head = document.getElementsByTagName('head')[0];
            styleElement = document.createElement('style');
            head.appendChild(styleElement);
            styleSheet = document.styleSheets[document.styleSheets.length - 1];
        }
        
        if (typeof styles === 'string') {
            if (styleElement) {
                styleElement.innerHTML = styles;
            } else {
                styleSheet.cssText = styles;
            }
        } else {
            var index = 0;
            for (var selector in styles){
                if (styleSheet.insertRule) {
                    var rule = selector + '{' + styles[selector] + '}';
                    styleSheet.insertRule(rule, index++);
                } else {
                    styleSheet.addRule(selector, styles[selector], index++);
                }
            }
        }
    }
};