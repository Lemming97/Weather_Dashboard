var APIKey = "021b34237bbcc96949e3a99359d6328e";

var today = moment().format('L');
var cityInputEL = document.querySelector('#enterCity');
var saveCityButton = document.querySelector('#searchBtn');

var searchHistoryList =
    JSON.parse(window.localStorage.getItem("searchHistoryList")) || [];

var saveCity = function(city) {
    //get value from input box
    console.log('saveCity function');
    var newCity = {
        city,
    };

    searchHistoryList.push(newCity);
    window.localStorage.setItem("newCity", JSON.stringify(searchHistoryList));
};

//display search history of cities 
var displaySearchHistory = function () {
    console.log(displaySearchHistory);

    // display on page
    var olEl = document.getElementById("searchHistory");
    olEl.textContent = "";

    searchHistoryList.forEach(function ({ city }) {
        // create li tag for each item
        var liEl = document.createElement("li");
        liEl.textContent = city;
        olEl.appendChild(liEl);


    });
};

//display search history of cities 
var displayCurrentWeather = function (currentWeather) {
    console.log(currentWeather)
};

//display search history of cities 
var displayForecast = function (dailyWeather) {
    console.log(dailyWeather)
};

//display search history of cities 
var displaySearchHistory = function () {
    console.log(displaySearchHistory);

    // display on page
    var olEl = document.getElementById("searchHistory");
    olEl.textContent = "";

    searchHistoryList.forEach(function ({ city }) {
        // create li tag for each item
        var liEl = document.createElement("li");
        liEl.textContent = city;
        olEl.appendChild(liEl);


    });
};

//current city fetch
var fetchCurrentCondition = function (city) {
    console.log(city);
    var currentWeatherQueryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    fetch(currentWeatherQueryURL)
        .then(function(res) { 
            return res.json()
        })
        .then(function(data) {
            return data.coord;
        })
        .then(function(coord) {
            console.log(coord)
            var oneCallQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${APIKey}`;
            return fetch(oneCallQueryURL);
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(weather) {
            displayCurrentWeather(weather.current);
            displayForecast(weather.daily.slice(1,6));
        })
        .catch(function(err) {
            console.error(err);
        });

};

//save to local storage function
saveCityButton.addEventListener("click", function () {
    //get value from input box
    var cityInput = cityInputEL.value.trim();
    if (cityInput === "") {
        return;
    }
    saveCity(cityInput);
    displaySearchHistory();
    fetchCurrentCondition(cityInput);
});