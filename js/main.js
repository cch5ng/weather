function getWeather() {
  
  if (!navigator.geolocation) {
    var msg = 'Your browser does not support geolocation. Please update your browser to a current version. Opera Mini browser is not supported by this application.';
    console.log(msg);
  }
  
  function success(data) {
  var AK = '9e8a6bd909702d86';
  var latitude = data.coords.latitude;
    var longitude = data.coords.longitude;
    var cityUrl = 'http://api.wunderground.com/api/' + AK + '/geolookup/q/' + latitude + ',' + longitude + '.json';
    var conditionsUrl; 
    
    $.getJSON(cityUrl, function(data) {
        //console.log('gets here too');
        //console.log('data: ' + data);
      var city = data.location.city;
        //console.log(city);
        
        conditionsUrl = 'http://api.wunderground.com/api/' + AK + '/conditions/q/CA/' + city + '.json';
      
        $.getJSON(conditionsUrl, function(data2) {
          //console.log('data2 ' + data2);
          var weather, temp_f, temp_c, wind_mph, wind_dir;
          
          weather = data2.current_observation.weather;
          console.log('weather: ' + weather);
          
          temp_f = data2.current_observation.temp_f;
          console.log('temp_f: ' + temp_f);
          temp_c = data2.current_observation.temp_c;
          
          wind_mph = data2.current_observation.wind_mph;
          wind_dir = data2.current_observation.wind_dir;
          console.log('wind: ' + wind_mph + ' due ' + wind_dir);
          
          
        });
      
      
    });
    
  }
  
  function error() {
    var err = 'Unable to get your location.';
    console.log(err);
  }
  
  navigator.geolocation.getCurrentPosition(success, error);
  
}

document.addEventListener('DOMContentLoaded', function(event) {
  //console.log('gets here');
  getWeather();
});