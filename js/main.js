const api = {
    url: "https://api.openweathermap.org/data/2.5/weather?",
    key: "52e348032f016a3154bff1b4668aaefe",
};

// TO-D0: city not found
//{"cod":"404","message":"city not found"}

//https://api.openweathermap.org/data/2.5/weather?q=London&appid={API key}

function getWeatherData(searchedCity, date) {
    fetch(api.url + "q=" + searchedCity + "&units=metric&APPID=" + api.key)
        .then((response) => response.json())
        .then((data) => {
            //$(".greeting").html(greeting);
            $(".city").html(data["name"] + ", " + data["sys"]["country"]);
            $(".date").html(date);
            $(".temp").html(data["main"]["temp"] + "&#8451;");
            console.log(data["coord"], "aaaa");
            $(".description").html(data["weather"][0]["description"]);
            //console.log(data["weather"]["description"], "aaa");
            $(".minmax").html(
                data["main"]["temp_min"] +
                "&#8451; | " +
                data["main"]["temp_max"] +
                "&#8451;"
            );
        })
        .catch((error) => console.log(error));
}

// Geolocation API
function error(err) {
    $(".city").html(`Failed to locate. Error: ${err.message}`);
}

function success(pos) {
    $(".city").html("Located.");
    //alert(`${pos.coords.latitude}, ${pos.coords.longitude}`);
    let lat = Math.round(pos.coords.latitude * 100) / 100;
    let lon = Math.round(pos.coords.longitude * 100) / 100;
    console.log(lat, lon);

    let url =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        api.key +
        "&units=metric";

    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data, "aaaaaaa");
            let today = new Date();
            let date = today.toDateString();
            let time = today.getHours();
            //let greeting = adjustGreeting(time);
            //$(".greeting").html(greeting);
            $(".city").html(data["name"] + ", " + data["sys"]["country"]);
            $(".date").html(date);
            $(".temp").html(data["main"]["temp"] + "&#8451;");
            console.log(data["coord"], "aaaa");
            $(".description").html(data["weather"][0]["description"]);
            //console.log(data["weather"]["description"], "aaa");
            $(".minmax").html(
                "min: " + data["main"]["temp_min"] +
                "&#8451; | " +
                "max: " + data["main"]["temp_max"] +
                "&#8451;"
            );
        })
        .catch((error) => console.log(error));
}

function getGeolocation() {
    // Set time out, longer than 1 minute stop
    if (navigator.geolocation) {
        $(".city").html("Locating…");
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        $(".city").html("Geolocation is not supported by this browser.");
    }
}

function adjustGreeting(time) {
    if (time <= 12) {
        return "Good morning!";
    } else if (time > 12 && time <= 18) {
        return "Good afternoon!";
    } else {
        return "Good evening!";
    }
}

//$("input:text").val()
$(document).ready(function() {
    // if user enter city
    $("#submit").on("click", function() {
        let searchedCity = $("#search").val();
        let today = new Date();
        let date = today.toDateString();
        let time = today.getHours();
        //let greeting = adjustGreeting(time);
        getWeatherData(searchedCity, date);
    });
    // if user allow know your location
    $("#location").on("click", function(e) {
        getGeolocation();
        event.stopPropagation();
    });
});

//https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
