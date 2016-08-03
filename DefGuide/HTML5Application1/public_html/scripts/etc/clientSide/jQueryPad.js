function handleClick() {
    alert('Do NOT click me!');
}

function page(n) {
    var wrappedWindowObject = $(window);
    var pageSize = wrappedWindowObject.height();
    var current = wrappedWindowObject.scrollTop();
    wrappedWindowObject.scrollTop(current + n * pageSize);
}

jQuery.noConflict();
jQuery(function($){
    'use strict';
    $('p.details').css('background-color', 'yellow').show('fast');

    $('.clicktohide').click(function() {
        $(this).slideUp('slow');
    });

    var url = 'https://www.newton.ac.uk/files/covers/968361.jpg';
    var image = $('<img />', {
        src: url,
        css: {borderWidth: 5},
        click: handleClick
    });

    var bodyScripts = $('script', document.body);
    bodyScripts.selector;
    bodyScripts.context;
    bodyScripts.jquery;

    var divs = $('div');
    divs.each(function(index){
        $(this).prepend(index + ': ');
        if (this.id === 'last') {
            return false;
        }
    });

    $(':header').map(function(){
        return this.id;
    }).toArray().sort();

    $('div').each(function(){
        if ($(this).is(':hidden')) {
            return;
        }

        // Do something with the visible ones here....
    });
    $('div-note').css('border', 'solid black 2px');
    $('div').removeClass();

    $('h1').css('font-weight');
    $('h1').css('fontWeight');
    $('h1').css('font-variant', 'smallcaps');
    $('h1').css({
        backgroundColor: 'black',
        textColor: 'white',
        fontVariant: 'small-caps',
        padding : '10px 2px 4px 20px',
        border: 'dotted black 4px'
    });
    $('h1').css('font-size', function (i, curval){
        return Math.round(1.25 * parseInt(curval));
    });
    $('h1').addClass('hilite');
    $('h1+p').addClass('hilite first');
    $('h1').toggleClass('big bold');
    $('h1').toggleClass(function(n){
        return 'big bold h1-' + n;
    });
    $('h1').toggleClass('hilite', true);
    $('h1').toggleClass('hilite', false);

    $('p').removeClass('hilite');
    $('p').removeClass('hilite first');
    $('p').hasClass('first');

    $('section').addClass(function(n){
        return 'section' + n;
    });
    $('section').removeClass(function(n){
        return 'section' + n;
    });
    
    $('tr:odd').toggleClass('oddrow');
    
    $('#lead').is('.first');
    $('#lead').is('.first.hilite');
    
    $('#surname').val();
    $('#usstate').val();
    $('select#extras').val();
    $('input:radio[name=ship:checked').val();
    $('#email').val('Invalid email address');
    $('input:checkbox').val(['opt1', 'opt2']);
    $('input:text').val(function(){
        return this.defaultValue;
    });

    var title = $('head title').text();
    var headline = $('h1').html();
    $('h1').text(function(n, current){
        return '§' + (n + 1) + ': ' + current;
    });
    
    var element = $('#sprite');
    var position = element.offset();
    position.top += 100;
    element.offset(position);
    
    $('h1').offset(function(index, currentPosition){
        return {
            left: currentPosition.left + 25 * index, 
            top : currentPosition.top
        };
    });
    
    var body = $('body');
    var contentWidth = body.width();
    var paddingWidth = body.innerWidth();
    var borderWidth = body.outerWidth();
    var marginWidth = body.outerWidth(true);
    var padding = paddingWidth - contentWidth;
    var borders = borderWidth - paddingWidth;
    var margins = marginWidth - borderWidth;
    
    $('div').data('x', 1);
    $('div.nodata').removeData('x');
    var x = $('#myDiv').data('x');
});


