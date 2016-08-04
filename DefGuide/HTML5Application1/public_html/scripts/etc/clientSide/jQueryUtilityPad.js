if ($.browser.mozilla && parseInt($.browser.version) < 4) {
    // ...
}

var clone = jQuery.extend({}, original);
var options = jQuery.extend({}, defaultOptions, userOptions);

var clone2 = jQuery.merge([], original);

var paras = $('p');
paras.first();
paras.last();
paras.eq(1);
paras.eq(-2);
paras[1];

$('p').slice(2, 5);
$('div').slice(-3);

$('div').filter('.note');
$('div').filter($('.note'));
$('div').filter(function(index) {
    'use strict';
    return index % 2 === 0;
});

$('div').not('#header', '#footer');
$('p').has('a[href]');

$('div, p');
$('div').add('p');
$('div').add($('p'));
$('div').add(document.getElementsByTagName('p'));

$('div').find('p');
$('#header, #footer').children('span');

$('h1').next('p');
$('h1').prev();

$('#footer').nextAll('p');
$('#footer').prevAll();
$('li').parent();
$('a[href]').parents('p');

$('a[href]').closest('div');
$('a[href]').parentsUntil(':not(div)');


var divs = $('div');
var paras = divs.find('p');
paras.addClass('highlight');
divs.css('border', 'solid black 1px');

$('div').find('p').addClass('highlight').end().css('border', 'solid black 1px');
$('div').css('border', 'solid black 1px').find('p').addClass('highlight');

var sel = $('div');
sel.pushStack(document.getElementsByTagName('p'));
sel.end();

$('div').find('p').andSelf().
    addClass('highlight').end().end().css('border', 'solid black 1px');