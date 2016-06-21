/**
 * Created by conor on 6/17/16.
 */

// This API will be based on City
// TO use the weather API on geographic coordinates use URL:
// http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=552c7aa61e643cd3912d0b10ddeb3f58
//API City Name
// http://api.openweathermap.org/data/2.5/weather?q=Minneapolis,us&appid=552c7aa61e643cd3912d0b10ddeb3f58

// jQuery.getJSON( url [, data ] [, success ] )
//http://api.jquery.com/jquery.getjson/



$(document).ready(function () {
    var lat;
    var long;
//Pull geolocation and set lat and long for user
    $.getJSON("http://ip-api.com/json", function (data2) {
        lat = data2.lat;
        long = data2.lon;

        var apiKey = "552c7aa61e643cd3912d0b10ddeb3f58";
        var baseURL = "http://api.openweathermap.org/data/2.5/weather?lat=";
        var apiURL = baseURL + lat + "&lon=" + long + "&appid=" + apiKey;
        //Test to see if I get correct API url
        console.log(apiURL);

        //Start weather program here
        $.getJSON(apiURL, function(data) {
            //Take the weather type and convert to first letter of string uppercase
            var weatherType = data.weather[0].description;
            weatherType = weatherType.toLowerCase().replace(/\b[a-z]/g, function(letter) {
                return letter.toUpperCase();
            });

            var kelvin = data.main.temp;
            //Data from API is in Kelvin so I must convert to fahrenheit, and remove the decimal places
            var fahrenheit = (kelvin * (9/5) - 459.67).toFixed(0);
            var city = data.name;

            //Display the data on the page
            $(".city").html(city);
            $(".localWeather").html("Today's temperature is: " + fahrenheit + "&deg;");
            $(".weatherType").html(weatherType);

            //For testing
            //console.log(fahrenheit);
            //console.log(weatherType);

        });

    });

});
