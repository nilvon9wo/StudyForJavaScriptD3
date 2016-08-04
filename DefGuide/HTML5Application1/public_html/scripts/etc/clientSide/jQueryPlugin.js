jQuery.fn.println = function(){
    'use strict';
    var message = Array.prototype.join.call(arguments, ' ');
    this.each(function(){
       jQuery(this).append(document.createTextNode(message)).append('<br/>');
    });
    return this;
};

$('#debug').println('x = ', x, '; y = ', y);

(function($){
    'use strict';
    // ...
}(jQuery));

jQuery.debug = function(){
    'use strict';
    var element = jQuery('#debug');
    if (element.length === 0){
        element = jQuery('<div id=\'debug\'><h1>Debugging Output</h1></div>');
        jQuery(document.body).append(element);
    }
    element.println.apply(element, arguments);
};

jQuery.expr[':'].draggable = function(element){
    'use strict';
    return element.draggable === true;
};

jQuery.expr[':'].data = function(element, index, match, array){
    'use strict';
    return element.hasAttribute('data-' + match[3]);
};

$('input.date').datepicker();