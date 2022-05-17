var APIKey = "021b34237bbcc96949e3a99359d6328e";

//current date
const today = moment().format("L");
let DateEL = document.querySelector("#current-date");
DateEL.textContent = today;

var cityInputEL = document.querySelector("#enterCity");
var saveCityButton = document.querySelector("#searchBtn");
var searchHistoryEl = document.getElementById("searchHistory");
var currentCityDetailEL = document.querySelector('#cityDetail');

var searchHistoryList =
    JSON.parse(window.localStorage.getItem("newCity")) || [];

//save city object
var saveCity = function (city) {
    //get value from input box
    console.log("saveCity function");
    var newCity = {
        city,
    };
    searchHistoryList.push(newCity);
    window.localStorage.setItem("newCity", JSON.stringify(searchHistoryList));

};




//display search history of cities 
var displaySearchHistory = function () {
    console.log('displaySearchHistory');

    // display on page
    searchHistoryEl.textContent = "";
    searchHistoryList.forEach(function ({
        city
    }) {
        // create li tag for each item
        let cityButtonEl = document.createElement("button");
        cityButtonEl.setAttribute("class", "list-group-item");
        cityButtonEl.setAttribute("data-id", `${city}`);
        cityButtonEl.textContent = city;
        searchHistoryEl.appendChild(cityButtonEl);

    });
};

//user should be able to click on users from search history
searchHistoryEl.addEventListener('click', function (event) {
    event.preventDefault();
    fetchCurrentCondition(event.target.dataset.id);
});

//display current weather
// humidity, temperature, name, date, icon, wind speed, uv index
var displayCurrentWeather = function (currentWeather) {
    console.log(currentWeather);


    var weather = currentWeather.weather;
    console.log(weather[0].description);


    var currentCityEl = document.createElement('p');
    currentCityEl.textContent = currentWeather.name;
    currentCityDetailEL.appendChild(currentCityEl);


    //wind speed
    var windSpeedEl = document.createElement('p');
    windSpeedEl.textContent = "Wind Speed: " + currentWeather.wind_speed + " MPH";
    currentCityEl.appendChild(windSpeedEl);

    //humidity 
    var humidityEL = document.createElement('p');
    humidityEL.textContent = "Humidity: " + currentWeather.humidity + " %";
    currentCityEl.appendChild(humidityEL);

    //temp as to have tempHolder because it has a few things listed in it 
    var temp = document.createElement('p');
    temp.textContent = "Temperature: " + currentWeather.temp + " F";
    currentCityEl.appendChild(temp);

    //uvi index 
    var uvIndexEL = document.createElement('p');
    uvIndexEL.textContent = "UV index: " + currentWeather.uvi;
    currentCityEl.appendChild(uvIndexEL);


    //weather obj
    var weatherHolder = currentWeather.weather;
    console.log(weatherHolder[0].description);

    //icon
    console.log(`https://openweathermap.org/img/w/${weatherHolder[0].icon}.png`);
    var iconUrl = `https://openweathermap.org/img/w/${weatherHolder[0].icon}.png`;
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

    var currentCityEl = document.querySelector('#fiveDay');

    for (j = 0; j < dailyWeather.length; j++) {
        //future date
        for (let i = 0; i < 1; i++) {
            var fiveDaysForwardEL = new moment().add(j + 1, 'day').format('L');
            let newDateEL = document.createElement('p');
            newDateEL.textContent = fiveDaysForwardEL;
            currentCityEl.appendChild(newDateEL);
        }


        //wind speed
        var windSpeedEl = document.createElement('p');
        windSpeedEl.textContent = "Wind Speed: " + dailyWeather[j].wind_speed + " MPH";
        currentCityEl.appendChild(windSpeedEl);

        //humidity 
        var humidityEL = document.createElement('p');
        humidityEL.textContent = "Humidity: " + dailyWeather[j].humidity + " %";
        currentCityEl.appendChild(humidityEL);

        //temp as to have tempHolder because it has a few things listed in it 
        var temp = document.createElement('p');
        var tempHolder = dailyWeather[j].temp;
        temp.textContent = "Temperature: " + tempHolder.day + " F";
        currentCityEl.appendChild(temp);

        //weather obj
        var weatherHolder = dailyWeather[j].weather;
        console.log(weatherHolder[0].description);

        //icon
        console.log(`https://openweathermap.org/img/w/${weatherHolder[0].icon}.png`);
        var iconUrl = `https://openweathermap.org/img/w/${weatherHolder[0].icon}.png`;
        var weatherIconEl = document.createElement("img");
        weatherIconEl.setAttribute("src", iconUrl);
        weatherIconEl.setAttribute("alt", weatherHolder[0].description);
        weatherIconEl.classList.add('weather_icon');
        currentCityEl.appendChild(weatherIconEl);

    }


};



//current city fetch
var fetchCurrentCondition = function (city) {
    console.log(city);
    var currentWeatherQueryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
    fetch(currentWeatherQueryURL)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            return data.coord;
        })
        .then(function (coord) {
            console.log(coord)
            var oneCallQueryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=imperial&appid=${APIKey}`;
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
    // currentCityEl.textContent = "" + today;
    var cityName = document.createElement('h2');
    cityName.textContent = "";
    cityName.setAttribute("class", "city_name");
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

displaySearchHistory();