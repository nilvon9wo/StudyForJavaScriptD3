function urlArgs(){
    var args = {};
    var query = location.search.substring(1);
    var pairs = query.split('&');
    
    pairs.forEach(function(pair) {
       var equalPosition = pair.indexOf('=');
       
       if (equalPosition !== -1) {
           var name = pair.substring(0, equalPosition);
           var value = pair.substring(equalPosition + 1);
           var decodedValue = decodeURIComponent(value);
           args[name] = decodedValue;
       }
    });
}