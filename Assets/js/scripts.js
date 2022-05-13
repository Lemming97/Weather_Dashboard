var APIKey = "021b34237bbcc96949e3a99359d6328e";
var city;

var today = moment().format('L');
var searchHistoryList = [];

var currentCondition = function (city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
}