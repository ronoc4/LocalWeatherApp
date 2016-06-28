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
//  $.getJSON("http://ip-api.com/json", function (data2) {
//         lat = data2.lat;
//         long = data2.lon;

    if ("geolocation" in navigator) {

        navigator.geolocation.getCurrentPosition(function (position) {

            lat = position.coords.latitude;
            long = position.coords.longitude;
            var apiKey = "552c7aa61e643cd3912d0b10ddeb3f58";
            var baseURL = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=";
            var apiURL = baseURL + lat + "&lon=" + long + "&appid=" + apiKey;
            //Test to see if I get correct API url
            console.log(apiURL);

            //Start weather program here
            $.getJSON(apiURL, function (data) {
                //Take the weather type and convert to first letter of string uppercase
                var weatherType = data.weather[0].description;
                weatherType = weatherType.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                    return letter.toUpperCase();
                });

                var mainW = data.weather[0].main;

                //Getting the wind speed in meters/sec to miles/hour
                var windSpeed = data.wind.speed;
                windSpeed = (windSpeed * 2.236936).toFixed(2);

                console.log("Here is the type of weather " + mainW);


                if (mainW === "Clouds") {
                    $('body').css('background-image', 'url("http://www.somersetcountygazette.co.uk/resources/images/4216738.jpg?display=1&htype=0&type=mc3")');
                } else if (mainW === "Clear") {
                    $('body').css('background-image', 'url("http://www.clouds365.com/blog/wp-content/uploads/2009/11/Oklahoma-Clear1.jpg")');
                } else if (mainW === "Rain") {
                    $('body').css('background-image', 'url("http://az616578.vo.msecnd.net/files/2016/05/28/636000076698153744-318535480_maxresdefault.jpg")');
                } else if (mainW === "Snow") {
                    $('body').css('background-image', 'url("http://az616578.vo.msecnd.net/files/2016/01/09/635879112155223228-319755513_635861833670816810507191518_6670-perfect-snow-1920x1080-nature-wallpaper.jpg")');
                } else if (mainW === "Thunderstorm") {
                    $('body').css('background-image', 'url("http://i.imgur.com/OT4cNAK.jpg")');
                }

                var tempSwap;
                var kelvin = data.main.temp;
                //Data from API is in Kelvin so I must convert to fahrenheit, and remove the decimal places
                var fahrenheit = (kelvin * (9 / 5) - 459.67).toFixed(0);
                //Convert to celsius
                var celsius = ((fahrenheit - 32) / 1.8).toFixed(0);
                var city = data.name;

                //Clicking the button will convert temp to C or F
                $(".localWeather").html("Today's temperature is: " + fahrenheit + "&deg;F");
                $('#getTemp').click(function () {
                    if (tempSwap === false) {
                        $(".localWeather").html("Today's temperature is: " + celsius + "&deg;C");
                        $('#getTemp').html('Fahrenheit');
                        tempSwap = true;
                    } else {
                        $(".localWeather").html("Today's temperature is: " + fahrenheit + "&deg;F");
                        $('#getTemp').html('Celsius');
                        tempSwap = false;
                    }
                });

                //Display the data on the page
                $(".city").html(city);
                $(".windSpeed").html("Wind " + windSpeed + " mph");

                $(".weatherType").html(weatherType);

                //For testing
                //console.log(fahrenheit);
                //console.log(weatherType);

            });

        });

    } else {
        $(".city").textContent("Error! You must enable location tracking.");
    }


});
