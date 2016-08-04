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
jQuery(function($) {
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
    divs.each(function(index) {
        $(this).prepend(index + ': ');
        if (this.id === 'last') {
            return false;
        }
    });

    $(':header').map(function() {
        return this.id;
    }).toArray().sort();

    $('div').each(function() {
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
        padding: '10px 2px 4px 20px',
        border: 'dotted black 4px'
    });
    $('h1').css('font-size', function(i, curval) {
        return Math.round(1.25 * parseInt(curval));
    });
    $('h1').addClass('hilite');
    $('h1+p').addClass('hilite first');
    $('h1').toggleClass('big bold');
    $('h1').toggleClass(function(n) {
        return 'big bold h1-' + n;
    });
    $('h1').toggleClass('hilite', true);
    $('h1').toggleClass('hilite', false);

    $('p').removeClass('hilite');
    $('p').removeClass('hilite first');
    $('p').hasClass('first');

    $('section').addClass(function(n) {
        return 'section' + n;
    });
    $('section').removeClass(function(n) {
        return 'section' + n;
    });

    $('tr:odd').toggleClass('oddrow');

    $('#lead').is('.first');
    $('#lead').is('.first.hilite');

    $('#surname').val();
    $('#usstate').val();
    $('select#extras').val();
    $('input:radio[name=ship]:checked').val();
    $('#email').val('Invalid email address');
    $('input:checkbox').val(['opt1', 'opt2']);
    $('input:text').val(function() {
        return this.defaultValue;
    });

    var title = $('head title').text();
    var headline = $('h1').html();
    $('h1').text(function(n, current) {
        return '§' + (n + 1) + ': ' + current;
    });

    var element = $('#sprite');
    var position = element.offset();
    position.top += 100;
    element.offset(position);

    $('h1').offset(function(index, currentPosition) {
        return {
            left: currentPosition.left + 25 * index,
            top: currentPosition.top
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


    $('#log').append('<br/>' + mesage);
    $('h1').prepend('§');
    $('h1').before('<hr/>');
    $('h1').after('<hr/>');
    $('hr').replaceWith('<br/>');
    $('h2').each(function() {
        var h2 = $(this);
        h2.replaceWith('<h1>' + h2.html() + '</h1>');
    });
    $('h1').map(function() {
        return this.firstChild
    }).before('§');
    $('<br/>');

    $('<br/>' + mesage).appendTo('#log');
    $(document.createTextNode('§')).prependTo('h1');
    $('<hr/>').insertBefore('h1');
    $('<hr/>').insertAfter('h1');
    $('<br/>').replaceAll('hr');

    $(document.body).append('<div id=\'linklist\'><h1>List of Links</h1></div>');
    $('a').clone().appendTo('#linklist');
    $('#linklist > a').after('<br/>');

    $('h1').wrap(document.createElement('i'));
    $('h1').wrapInner('<i/>');
    $('body>p:first').wrap('<a name=\'lead\'><div class=\'first\'></div></a>');
    $('body>p:not(:first)').wrapAll('<div class=\'rest\'></div>');
    $('p').click(function() {
        $(this).css('background-color', 'gray');
    });

    var url2 = 'https://www.newton.ac.uk/files/covers/968362.jpg';
    var imageDescription = 'ugly';
    $('<img/>', {
        src: url2,
        alt: imageDescription,
        className: 'translucentImage',
        click: function() {
            $(this).css('opacity', '50%');
        }
    });

    function func() {
        alert('Hello, Mellow Yellow!');
    }

    function func2() {
        alert('Goodbye, Cruel World!');
    }

    $('p').bind('click', func);
    $('a').bind('mouseenter mouseleave', func);
    $('a').bind('mouseover.myMod', func);
    $('a').bind('mouseover.myMod.yourMod', func);
    $('a').bind({
        mouseenter: func,
        mouseleave: func2
    });

    $('*').unbind();
    $('a').unbind('mouseover mouseout');
    $('a').unbind('mouseover.myMod mouseout.myMod');
    $('a').unbind('.myMod');
    $('a').unbind('clicks.ns1.ns2');

    function myClickHandler() {
        alert('Can\'t click this!');
    }

    $('#myButton').unbind('click', myClickHandler);

    function mouseoverHandler() {
        alert('Can\'t click this!');
    }

    function mouseoutHandler() {
        alert('Can\'t click this!');
    }

    $('a').unbind({
        mouseover: mouseoverHandler,
        mouseout: mouseoutHandler
    });

    $('#my_form').submit();
    $('#my_form').trigger('submit');

    $('button').trigger('click.ns1');
    $('button').trigger('click!');
    $('button1').click(function(event){
        $('#button2').trigger(event);
    });

    $('button1').trigger({
        type: 'click',
        synthetic: true
    });

    $('button1').click(function(event){
        if (event.synthetic) {
            // ...
        }
    });

    $('button1').trigger('click', true);
    $('button1').trigger('click', [x,y,z]);

    $('#logoff').click(function(){
        $.event.trigger('logoff');
        window.location = 'logoff.php';
    });

    function linkHandler(){
        alert('Unhand me, vile fiend!');
    }
    $(document).delegate('a', 'mouseover', linkHandler);

    $('a').bind('mouseover', linkHandler);
    $('.dynamic').delegate('a', 'mouseover', linkHandler);

    $('a').live('mouseover', linkHandler);
    $('a', $('.dynamic')).live('mouseover', linkHandler);

    $('a').die('mouseover');
    $('a').die('mouseover', linkHandler);

    $(document).undelegate('a');
    $(document).undelegate('a', 'mouseover');
    $(document).undelegate('a', 'mouseover', linkHandler);


});





