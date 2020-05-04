const api = {
    url: "http://api.openweathermap.org/data/2.5/weather?q=",
    key: "5fc8363bc702ad693c40c8d30de0c321",
};

let today = new Date();
let date = today.toDateString();
let time = today.getHours();
console.log(time);

function getWeatherData(searchedCity) {
    fetch(api.url + searchedCity + "&units=metric&APPID=" + api.key)
        .then((response) => response.json())
        .then((data) => {
            $(".city").html(data["name"] + ", " + data["sys"]["country"]);
            $(".date").html(date);
            $(".temp").html(data["main"]["temp"] +
                "&#8451;");
            $(".description").html(data["weather"]["description"]);
            $(".minmax").html(
                data["main"]["temp_min"] + "&#8451; / " + data["main"]["temp_max"] + "&#8451;"
            );
        })
        .catch((error) => console.log(error));
}
//$("input:text").val()
$(document).ready(function() {
    $("#submit").on("click", function() {
        let searchedCity = $("#search").val();
        getWeatherData(searchedCity);
    });
});
//http: //api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=5fc8363bc702ad693c40c8d30de0c321&units=metric