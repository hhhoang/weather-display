const api = {
    url: "http://api.openweathermap.org/data/2.5/weather?q=",
    key: "5fc8363bc702ad693c40c8d30de0c321",
};


function getWeatherData(searchedCity, date) {
    fetch(api.url + searchedCity + "&units=metric&APPID=" + api.key)
        .then((response) => response.json())
        .then((data) => {
            $(".city").html(data["name"] + ", " + data["sys"]["country"]);
            $(".date").html(date);
            $(".temp").html(data["main"]["temp"] +
                "&#8451;");
            $(".description").html(data["weather"]["description"]);
            console.log(data["weather"]["description"], "aaa");
            $(".minmax").html(
                data["main"]["temp_min"] + "&#8451; | " + data["main"]["temp_max"] + "&#8451;"
            );
            $(".display").css({
                'background': 'url(../img/background.jpeg);'
            });
        })
        .catch((error) => console.log(error));
}

// Geolocation API
function error(err) {
    $(".city").html(`Failed to locate. Error: ${err.message}`);
}

function success(pos) {
    $(".city").html('Located.');
    alert(`${pos.coords.latitude}, ${pos.coords.longitude}`);
}

function getGeolocation() {
    if (navigator.geolocation) {
        $(".city").html('Locating…');
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        $(".city").html('Geolocation is not supported by this browser.');
    }
}



//$("input:text").val()
$(document).ready(function() {
    $("#submit").on("click", function() {
        let searchedCity = $("#search").val();
        let today = new Date();
        let date = today.toDateString();
        let time = today.getHours();
        getWeatherData(searchedCity, date);
    });
    $("#location").on('click', function(e) {
        getGeolocation();
        event.stopPropagation();
    });
});

//http: //api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=5fc8363bc702ad693c40c8d30de0c321&units=metric