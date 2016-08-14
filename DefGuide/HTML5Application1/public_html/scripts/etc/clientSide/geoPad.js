navigator.geolocation.getCurrentPosition(function(position){
  console.log('GETTING...');
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  alert('Your position:' + latitude + ', ' + longitude);
});

console.log('navigator', navigator);
console.log('navigator.geolocation', navigator.geolocation);
console.log('navigator.geolocation.getCurrentPosition', navigator.geolocation.getCurrentPosition);