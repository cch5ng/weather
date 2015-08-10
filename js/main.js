function getWeather() {
  
  if (!navigator.geolocation) {
    var msg = 'Your browser does not support geolocation. Please update your browser to a current version. Opera Mini browser is not supported by this application.';
    console.log(msg);
  }
  
  function success(data) {
	var AK = '9e8a6bd909702d86';
    var latitude, longitude;

	navigator.geolocation.getCurrentPosition(function(position) {
		latitude = position.coords.latitude;
        console.log('latitude: ' + latitude);
		longitude = position.coords.longitude;
      
	});

    var url = 'http://api.wunderground.com/api/' + AK + '/geolookup/q/' + latitude + ',' + longitude + '.json';
      
    $.getJSON(url, function(data) {
        console.log('gets here too');
        console.log('data: ' + data);
	    var city = data.location.city;
        console.log(city);
    });
    
  }
  
  function error() {
    var err = 'Unable to get your location.';
    console.log(err);
  }
  
  navigator.geolocation.getCurrentPosition(success, error);
  
}

document.addEventListener('DOMContentLoaded', function(event) {
  console.log('gets here');
  getWeather();
});


// if ('geolocation' in navigator) {

// } else {
// 	var msg = 'Your browser does not support geolocation. Please update your browser to a current version. Opera Mini browser is not supported by this application. ';
// }