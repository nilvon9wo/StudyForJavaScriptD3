var geolocationHelper = {
    getLocalMap: function() {
        if (!navigator.geolocation) {
            throw new Error('Geolocation not supported.');
        }

        var image = document.createElement('img');
        navigator.geolocation.getCurrentPosition(setMapUrl);
        return image;

        function setMapUrl(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            var accuracy = position.coords.accuracy;
            var zoomLevel = 20;
            if (accuracy > 80) {
                zoomLevel -= Math.round(Math.log(accuracy / 50)) / Math.LN2;
            }

            var url = 'http://maps.google.com/maps/api/staticmap' +
                    '?center=' + latitude + ',' + longitude +
                    '&size=640x640&sensor=true' +
                    '&zoom=' + zoomLevel;

            image.src = url;
        }
    }, 
    whereAmI: function(element) {
        var fiveMinutes = 300000;
        var fifteenSeconds = 15000;
        var options = {
            enableHighAccuracy: false,
            maximumAge: fiveMinutes,
            timeout: fifteenSeconds
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, failure, options);
        } else {
            element.innerHTML = 'Geolocation not supported in this browser';
        }
        
        function failure(error) {
            element.innerHTML = 'Geolcation error ' + error.code + ': ' + error.message;
        }
        
        function success(position) {
            var message = 'At ' + 
                    new Date(position.timestamp).toLocaleString() + 
                    ' you were within ' +  position.coords.accuracy + 
                    ' meters of latitude ' +   position.coords.latitude +
                    ' longitude ' + position.coords.longitude + '.';
            
            if (position.coords.altitude) {
                message += ' You are ' + position.coords.altitude + 
                        ' + ' + position.coords.altitudeAccuracy + 
                        ' meters above sea level.';
            }
            
            if (position.coords.speed) {
                message += ' You are travelling at ' + position.coords.speed + 
                        'm/s on heading '  +  position.coords.head + '.';
            }
            
            console.log(message);
            element.innerHTML = message;
        }
    }
};

