function loadAsync(url){
    'use strict';
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = url;
    head.appendChild(script);
}