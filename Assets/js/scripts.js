var APIKey = "021b34237bbcc96949e3a99359d6328e";

var today = moment().format('L');
$("#current-date").text("(" + today + ")");



var cityInputEL = document.querySelector('#enterCity');
var saveCityButton = document.querySelector('#searchBtn');

var searchHistoryList =
    JSON.parse(window.localStorage.getItem("searchHistoryList")) || [];

//save city object
var saveCity = function (city) {
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

    searchHistoryList.forEach(function ({
        city
    }) {
        // create li tag for each item
        var liEl = document.createElement("li");
        liEl.textContent = city;
        olEl.appendChild(liEl);


    });
};

//display search history of cities 
// humidity, temperature, name, date, icon, wind speed, uv index
// humidity, temp, uv index, weather(destructure), windspeed
var displayCurrentWeather = function (currentWeather) {
    console.log(currentWeather);
    console.log(currentWeather.humidity);
    console.log(currentWeather.uvi);
    console.log(currentWeather.temp);
    console.log(currentWeather.wind_speed);

    var weather = currentWeather.weather;
    console.log(weather[0].description);

    // var weatherContentEl = document.querySelector('#weatherContent')
    var cityDetailEL = document.querySelector('#cityDetail');
    // cityDetailEL.textContent = "";
    // weatherContentEl.classList.remove("hide");
    var currentCityEl = document.createElement('p');
    currentCityEl.textContent = currentWeather.name;
    cityDetailEL.appendChild(currentCityEl);



};

//display search history of cities 
var displayForecast = function (dailyWeather) {
    console.log(dailyWeather)
    console.log(dailyWeather[0].weather);
    //dailyWeather[0].humidity
    var  currentCityEl = document.querySelector('#fiveDay');
    for(i=0; i < dailyWeather.length; i++) {
        //clouds
        var cityName = document.createElement('h2');
        cityName.textContent = dailyWeather[i].clouds;
        currentCityEl.appendChild(cityName);
        var temp = document.createElement('p');

        //temp
        var tempHolder = dailyWeather[i].temp;
        temp.textContent = tempHolder.day;
        currentCityEl.appendChild(temp);
        
        //weather obj
        var weatherHolder = dailyWeather[i].weather;
        console.log(weatherHolder[0].description);
        console.log(`https://openweathermap.org/img/w/${weatherHolder[0].icon}.png`);
        //icon
        // var iconUrl = `https://openweathermap.org/img/w/${weatherHolder[0].icon}.png`;
    }



};

//display search history of cities 
var displaySearchHistory = function () {
    console.log(displaySearchHistory);

    // display on page
    var olEl = document.getElementById("searchHistory");
    olEl.textContent = "";

    searchHistoryList.forEach(function ({
        city
    }) {
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
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            return data.coord;
        })
        .then(function (coord) {
            console.log(coord)
            var oneCallQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${APIKey}`;
            return fetch(oneCallQueryURL);
        })
        .then(function (res) {
            return res.json();
        })
        .then(function (weather) {
            displayCurrentWeather(weather.current);
            displayForecast(weather.daily.slice(1, 6));
        })
        .catch(function (err) {
            console.error(err);
        });

        //formula
       var  currentCityEl = document.querySelector('#current-city');
       var cityName = document.createElement('h2');
       cityName.textContent = city;
       currentCityEl.appendChild(cityName);

       


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