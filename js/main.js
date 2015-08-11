function getWeather() {
  
  if (!navigator.geolocation) {
    var msg = 'Your browser does not support geolocation. Please update your browser to a current version. Opera Mini browser is not supported by this application.';
    console.log(msg);
  }
  
  function success(data) {
  var AK = 'api_key';
  var latitude = data.coords.latitude;
    var longitude = data.coords.longitude;
    var cityUrl = 'http://api.wunderground.com/api/' + AK + '/geolookup/q/' + latitude + ',' + longitude + '.json';
    var conditionsUrl; 
    var tempFormat = 'F';
    var temp;
    
    $.getJSON(cityUrl, function(data) {
      var city = data.location.city;

        conditionsUrl = 'http://api.wunderground.com/api/' + AK + '/conditions/q/CA/' + city + '.json';

        $.getJSON(conditionsUrl, function(data2) {
          var weather, temp_f, temp_c, wind_mph, wind_dir;

          weather = data2.current_observation.weather;
          var weatherStr = weather + ' in ' + city;

          temp_f = data2.current_observation.temp_f;
          temp_c = data2.current_observation.temp_c;
          temp = temp_f;
          var tempStr;

          wind_mph = data2.current_observation.wind_mph;
          wind_dir = data2.current_observation.wind_dir;
          var windStr = 'Wind from the ' + wind_dir + ' at ' + wind_mph + ' mph';

          //update DOM with weather data
          var pWeather = document.createElement('p');
          pWeather.innerText = weatherStr;
          var divWeather = document.querySelector('.weather');
          divWeather.appendChild(pWeather);

          function updateTemp() {
            tempStr = temp + '&deg; ' + tempFormat;
            var pTemp = document.querySelector('.temp-data');
            pTemp.innerHTML = '';
            pTemp.innerHTML = tempStr;
          }

          updateTemp();

          function addTempButton() {
            var button = document.createElement('button');
            button.id = 'tempBtn';
            button.setAttribute('class', 'button');
            var divTemp = document.querySelector('.temp');
            divTemp.appendChild(button);
          }

          addTempButton();

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
  getWeather();
});