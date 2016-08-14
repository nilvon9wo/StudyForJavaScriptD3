$(window).on('load', twitterLoader);

function twitterLoader() {
    var origin = 'http://localhost:8383';
    var gadget = 'HTML5Application1/TwitterSearchGadget.html';
    var iframe = $('<iframe>').attr({
        src : origin + '/' + gadget,
        width: '250',
        height: '100%',
        float: 'right'
    });
    
    $('body').append(iframe);
    
    $.each($('a'), function(index, link){
        $(link).on('mouseover', function(){
            var href = $(link).attr('href');
            iframe[0].contentWindow.postMessage(href, origin);
        });
    });
}