function handleClick() {
    alert('Do NOT click me!');
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

});


