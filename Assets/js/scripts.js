var APIKey = "021b34237bbcc96949e3a99359d6328e";


var today = moment().format('L');
var cityInputEL = document.querySelector('#enterCity');


var searchHistoryList =
    JSON.parse(window.localStorage.getItem("searchHistoryList")) || [];

//save to local storage function
var saveCity = function () {
    //get value from input box
    var CityInput = cityInputEL.value.trim();
    console.log('saveCity function');
    if (cityInputEL !== "") {
        var newCity = {
            city: CityInput,
        };

        searchHistoryList.push(newCity);
        window.localStorage.setItem("newCity", JSON.stringify(searchHistoryList));
    }
    displayEnteredCity();
};

//display previous cities 
var displayEnteredCity = function () {
    console.log(displayEnteredCity);

    // display on page
    var olEl = document.getElementById("searchHistory");
    olEl.textContent = "";

    searchHistoryList.forEach(function ({

        city
    }) {
        // create li tag for each item
        var liEl = document.createElement("li");
        // liEl.textContent = drink + " &  zipCode";
        liEl.textContent = city;
        olEl.appendChild(liEl);


    });
    currentCondition();
};



//current city fetch
var currentCondition = function (city) {
    console.log(city);
    var CityInput = cityInputEL.value.trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    fetch(queryURL);

};