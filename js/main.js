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
    var tempFormat = 'F';
    var temp;
    
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
          var weatherStr = weather;
          // console.log('weather: ' + weather);
          
          temp_f = data2.current_observation.temp_f;
          //console.log('temp_f: ' + temp_f);
          temp_c = data2.current_observation.temp_c;
          temp = temp_f;

          var tempStr = temp + ' degrees ' + tempFormat + '.';
          
          wind_mph = data2.current_observation.wind_mph;
          wind_dir = data2.current_observation.wind_dir;
          var windStr = 'Wind is coming from ' + wind_dir + ' at ' + wind_mph + ' mph.';
          //console.log('wind is coming from ' + wind_dir + ' at ' + wind_mph + ' mph.');

          //update DOM with weather data
          var pWeather = document.createElement('p');
          pWeather.innerText = weatherStr;
          var divWeather = document.querySelector('.weather');
          divWeather.appendChild(pWeather);

          function updateTemp() {
            var divTemp = document.querySelector('.temp');
            var pTemp0 = document.querySelector('div.temp > p');

            if (pTemp0) {
              divTemp.removeChild(pTemp0);
            }

            tempStr = temp + ' degrees ' + tempFormat + '.';
            var pTemp = document.createElement('p');
            pTemp.innerText = tempStr;
            divTemp.appendChild(pTemp);
          }

          updateTemp();

          function updateButton() {
            var btn = document.querySelector('#tempBtn');
            if (tempFormat === 'F') {
              btn.innerText = 'Get Celcius';
            } else {
              btn.innerText = 'Get Fahrenheit';
            }
          }

          updateButton();

          var pWind = document.createElement('p');
          pWind.innerText = windStr;
          var divWind = document.querySelector('.wind');
          divWind.appendChild(pWind);

          //button click event handler
          function tempBtnClickHandler() {
            if (tempFormat === 'F') {
              tempFormat = 'C';
              temp = temp_c;
            } else {
              tempFormat = 'F';
              temp = temp_f;
            }

            updateTemp();
            updateButton();

          }

          //button click event listener
          var tempBtn = document.querySelector('#tempBtn');
          tempBtn.addEventListener('click', tempBtnClickHandler);

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