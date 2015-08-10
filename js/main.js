if ('geolocation' in navigator) {

	var AK = '9e8a6bd909702d86';
    var latitude, longitude;

	navigator.geolocation.getCurrentPosition(function(position) {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;
	});

    var url = 'http://api.wunderground.com/api/' + AK + '/geolookup/q/' + latitude + ',' + longitude + '.json';
      
    $.getJSON(url, function(data) {
	    var city = data.city;
        console.log(city);
    });



} else {
	var msg = 'Your browser does not support geolocation. Please update your browser to a current version. Opera Mini browser is not supported by this application. ';
}