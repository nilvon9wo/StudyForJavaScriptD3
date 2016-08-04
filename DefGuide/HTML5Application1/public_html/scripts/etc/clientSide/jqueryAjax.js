setInterval(function() {
    $('#stats').load('status_report.html');
}, 60000);

$('#temp').load('weather_report.html #temperature');
$('#temp').load('us_weather_report.html', 'zipcode=02134');
$('#temp').load('us_weather_report.html', {
    zipcode: '02134',
    units: 'F'
});

jQuery.getScript('http://example.com/js/widget.js');
jQuery.getScript('js/jquery.my_plugin.js', function(){
    'use strict';
    $('div').my_plugin();
});

jQuery.getJSON('data.json', function(data){
    'use strict';
    //...
});

$('#submit_button').click(function(event){
    'use strict';
    $(this.form).load(
        this.form.action,
        $(this.form.serialize())
    );
    event.preventDefault();
    this.disabled = 'disabled';
});

$.param({a:[1,2,3]});
$.param({o:{x:1, y:true}});
$.param({o:{x:{y:[1,2]}}});

jQuery.get('debug.txt', alert);

jQuery.ajax({
    type: 'GET',
    url: url,
    data: null,
    dataType: 'script',
    success: callback
});

jQuery.ajaxSetup({
    timeout: 2000,
    cache: false
});

jQuery.get('data.txt')
    .success(function(data){ console.log('Got', data); })
    .success(function(data){ process(data); });

$('#loading_animation').bind({
    ajaxStart: function() { $(this).show(); },
    ajaxStop: function() { $(this).hide(); }
});
