/*
    Assignment #4
    Clay Laliberty - 0673373
*/

$(function () {
    var storedLocation = localStorage.getItem("userLocation");

    navigator.geolocation.getCurrentPosition(function (position) {
        var currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        $("#locationhere").text(`Current Location: ${currentLocation.latitude}, ${currentLocation.longitude}`);

        if (storedLocation) {
            var storedLocationObj = JSON.parse(storedLocation);

            var distance = calcDistanceBetweenPoints(currentLocation.latitude, currentLocation.longitude, storedLocationObj.latitude, storedLocationObj.longitude);

            var distanceInKm = distance / 1000;

            var $storedLocationTag = $("<p>").text(`Stored Location: ${storedLocationObj.latitude}, ${storedLocationObj.longitude}`);

            var $welcomeMessage = $("<h1>").text("Welcome back to the page!");

            var $distanceMessage = $("<p>").text(`You traveled ${distanceInKm.toFixed(2)} km since your last visit.`);

            $("#locationhere").append($storedLocationTag);
            $("#locationhere").append($welcomeMessage);
            $("#locationhere").append($distanceMessage);
        } else {
            var $welcomeMessage = $("<h1>").text("Welcome to the page for the first time!");
            $("#locationhere").append($welcomeMessage);
        }

        localStorage.setItem("userLocation", JSON.stringify(currentLocation));
    });


    // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINITION
    // function to calculate the distance in metres between two lat/long pairs on Earth
    // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
    // Aren't those cool variable names? Yah gotta love JavaScript
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in metres
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});
