jQuery.fx.speeds['medium-fast'] = 300;
jQuery.fx.speeds['medium-slow'] = 500;
jQuery.easing['squareroot'] = Math.sqrt;

$('.stopMoving').click(function() {
    jQuery.fx.off = true;
});

$('#blinker').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn();


$('#message').fadeIn();
$('#message').fadeOut('fast');
$('#message').fadeIn('fast', function() {
    'use strict';
    $(this).text('Hello World');
});
$('#message').fadeIn({
    duration: 'fast',
    complete: function() {
        'use strict';
        $(this).text('Hello World');
    }
});

$('img').fadeOut().show(300).slideUp().slideToggle();
$('img').animate({height: 0});

$('#sprite').animate({
    opacity: .25,
    fontSize: 10
}, {
    duration: 500,
    complete: function() {
        'use strict';
        this.text('Goodbye');
    }
});

$('p').animate({
    marginLeft : '+=.5in',
    opacity: '-=.1'
});

$('img').animate({
    width: 'hide',
    borderLeft: 'hide',
    borderRight: 'hide',
    paddingLeft: 'hide',
    paddingRight: 'hide'
});

$('img').fadeIn(500)
    .animate({width: '+=100'}, {queue: false, duration: 1000})
    .fadeOut(500);

$('img').animate({width: '+=100'}, {duration: 500, easing: 'linear'});
$('img').animate({width: '+=100'}, 500, 'linear');

$('img').animate({
    width: 'hide',
    height: 'hide',
    opacity: 'hide'
},{
    specialEasing: {
        width: 'linear',
        height: 'linear'
    }
});

$('img').animate({
    width: ['hide', 'linear'],
    height: ['hide', 'linear'],
    opacity: 'hide'
});

$('img').bind({
    mouseover: function(){ $(this).stop().fadeTo(300, 1.0); },
    mouseout: function(){ $(this).stop().fadeTo(300, 0.5); }
});

$('img').fadeTo(100, 0.5).delay(200).slideUp();

$('img').bind({
    mouseover: function(){ $(this).stop(true).delay(100).fadeTo(300, 1.0); },
    mouseout: function(){ $(this).stop(true).fadeTo(300, 0.5); }
});

$('#message').fadeIn().delay(200).queue(function(next){
    'use strict';
    $(this).text('Hello World');
    next();
}).animate({borderWidth: '+=10px;'});

var e = '#e';
$(e).queue(func);
jQuery.queue(e, func);




