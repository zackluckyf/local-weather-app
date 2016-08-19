$(document).ready(function() {
    "use strict";

    // calls the openweathermap data by latitude and longitude
    // api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}

    var location = $(".location");
    var temperature = $(".temperature");
    var weather = $(".weather");
    var latitude = 0;
    var longitude = 0;
    var latDisplay = 0;
    var longDisplay = 0;
    var latLetter = "a";
    var longLetter = "b";
    var temp = 0;
    var metric = true;
    var imgArray = new Array();

    imgArray[0] = new Image();
    imgArray[0].src = 'resources/images/clear.png';

    imgArray[1] = new Image();
    imgArray[1].src = 'resources/images/cloudy.png';

    imgArray[2] = new Image();
    imgArray[2].src = 'resources/images/raining.png';

    imgArray[3] = new Image();
    imgArray[3].src = 'resources/images/snowing.png';

    imgArray[4] = new Image();
    imgArray[4].src = 'resources/images/thunderstorms.png';

    imgArray[5] = new Image();
    imgArray[5].src = 'resources/images/windy.png';


    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            location.html("Geolocation is not supported by this browser.");
        }
    }

    function latDirection() {
        latDisplay < 0 ? latLetter = "S" : latLetter = "N";
        longDisplay < 0 ? longLetter = "W" : longLetter = "E";
    }

    function showPosition(position) {
        latitude = Math.round(position.coords.latitude);
        longitude = Math.round(position.coords.longitude);
        latitude < 0 ? latDisplay = latitude * -1 : latDisplay = latitude * 1;
        longitude < 0 ? longDisplay = longitude * -1 : longDisplay = longitude * 1;
        latDirection();
        location.html("Latitude: " + latDisplay + "&deg; " + latLetter + "<br>Longitude: " + longDisplay + "&deg; " + longLetter);
        $.get("https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&cnt=1&appid=6b766b599bfc44b9f27b4f348f6ce770&units=imperial", function(data) {
            temp = Math.round(data.main.temp);
            temperature.html(temp + "&deg; F");
            weather.html(data.weather[0].description);
            if (data.weather[0].description.includes('clear')) {
                $('img').src = imgArray[0].src;
            }
            weatherPicture(data);
            console.log(data);
        }, "json");
    }

    function weatherPicture(data) {
        if (data.weather[0].description.includes('clear')) {
            document.getElementById("imageid").src = imgArray[0].src;
        } else if (data.weather[0].description.includes('cloudy')) {
            document.getElementById("imageid").src = imgArray[1].src;
        } else if (data.weather[0].description.includes('rain')) {
            document.getElementById("imageid").src = imgArray[2].src;
        } else if (data.weather[0].description.includes('snow')) {
            document.getElementById("imageid").src = imgArray[3].src;
        } else if (data.weather[0].description.includes('thunder')) {
            document.getElementById("imageid").src = imgArray[4].src;
        } else if (data.weather[0].description.includes('windy')) {
            document.getElementById("imageid").src = imgArray[5].src;
        }

    }

    getLocation();

    temperature.click(function() {
        if (metric === true) {
            metric = false;
            $.get("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=6b766b599bfc44b9f27b4f348f6ce770&units=metric", function(data) {
                temp = Math.round(data.main.temp);
                temperature.html(temp + "&deg; C");
            }, "json");
        } else {
            metric = true;
            $.get("https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=6b766b599bfc44b9f27b4f348f6ce770&units=imperial", function(data) {
                temp = Math.round(data.main.temp);
                temperature.html(temp + "&deg; F");
            }, "json");
        }

    });

});
