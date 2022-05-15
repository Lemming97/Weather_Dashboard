var APIKey = "021b34237bbcc96949e3a99359d6328e";

//current date
const today = moment().format('L');
let DateEL = document.querySelector('#current-date');
DateEL.textContent = today;




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


    //wind speed
    var windSpeedEl = document.createElement('p');
    windSpeedEl.textContent = currentWeather.wind_speed;
    currentCityEl.appendChild(windSpeedEl);

    //humidity 
    var humidityEL = document.createElement('p');
    humidityEL.textContent = currentWeather.humidity;
    currentCityEl.appendChild(humidityEL);

    //temp as to have tempHolder because it has a few things listed in it 
    var temp = document.createElement('p');
    temp.textContent = currentWeather.temp;
    currentCityEl.appendChild(temp);

    //uvi index 
    var uvIndexEL = document.createElement('p');
    uvIndexEL.textContent = currentWeather.uvi;
    currentCityEl.appendChild(uvIndexEL);


    //weather obj
    var weatherHolder = currentWeather.weather;
    console.log(weatherHolder[0].description);

    //icon
    console.log(`https://openweathermap.org/img/w/${weatherHolder[0].icon}.png`);
    var iconUrl = `https://openweathermap.org/img/w/${weatherHolder[0].icon}.png`;
    // $("#weatherIconDay" + i).attr("src", iconUrl).attr("alt", weatherHolder[0].description);
    var weatherIconEl = document.createElement("img");
    weatherIconEl.setAttribute("src", iconUrl);
    weatherIconEl.setAttribute("alt", weatherHolder[0].description);
    weatherIconEl.classList.add('weather_icon');
    currentCityEl.appendChild(weatherIconEl);




};

//display 5day forecast  history of cities
//an icon representation of weather conditions, the temperature, the wind speed, and the humidity 
var displayForecast = function (dailyWeather) {
    console.log(dailyWeather)
    console.log(dailyWeather[0].weather);

    // var fiveDaysForwardEL = new Date();

    //dailyWeather[0].humidity
    var currentCityEl = document.querySelector('#fiveDay');
    for (i = 0; i < dailyWeather.length; i++) {

        //future date
        for (let i = 0; i < 1; i++) {

            // fiveDaysForwardEL.setDate(fiveDaysForwardEL.getDate() + 1);

            // var fiveDaysForwardEL = new moment().add(1, 'day').format('L');
            var fiveDaysForwardEL = new moment().add(j+1, 'day').format('L');
            let newDateEL = document.createElement('p');
            newDateEL.textContent = fiveDaysForwardEL;
            currentCityEl.appendChild(newDateEL);
        }


        //wind speed
        var windSpeedEl = document.createElement('p');
        windSpeedEl.textContent = dailyWeather[i].wind_speed;
        currentCityEl.appendChild(windSpeedEl);

        //humidity 
        var humidityEL = document.createElement('p');
        humidityEL.textContent = dailyWeather[i].humidity;
        currentCityEl.appendChild(humidityEL);

        //temp as to have tempHolder because it has a few things listed in it 
        var temp = document.createElement('p');
        var tempHolder = dailyWeather[i].temp;
        temp.textContent = tempHolder.day;
        currentCityEl.appendChild(temp);

        //weather obj
        var weatherHolder = dailyWeather[i].weather;
        console.log(weatherHolder[0].description);

        //icon
        console.log(`https://openweathermap.org/img/w/${weatherHolder[0].icon}.png`);
        var iconUrl = `https://openweathermap.org/img/w/${weatherHolder[0].icon}.png`;
        // $("#weatherIconDay" + i).attr("src", iconUrl).attr("alt", weatherHolder[0].description);
        var weatherIconEl = document.createElement("img");
        weatherIconEl.setAttribute("src", iconUrl);
        weatherIconEl.setAttribute("alt", weatherHolder[0].description);
        weatherIconEl.classList.add('weather_icon');
        currentCityEl.appendChild(weatherIconEl);

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
    var currentCityEl = document.querySelector('#current-city');
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