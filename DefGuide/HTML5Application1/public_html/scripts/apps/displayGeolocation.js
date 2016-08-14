/* global geolocationHelper */

whenReady(function(){
    var body = document.getElementsByTagName('Body')[0];
    var map = geolocationHelper.getLocalMap();
    body.appendChild(map);
    var userLocationElement = document.getElementById('userLocation');
    geolocationHelper.whereAmI(userLocationElement);
});