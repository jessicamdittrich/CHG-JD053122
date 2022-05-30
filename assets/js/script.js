// SEARCH VARIABLES
let inputSearches = document.getElementById('search-input');
let searchButton = document.querySelector('#search-button');

// DATE VARIABLES
let date = new Date().toDateString();
let todaysDateInput = document.getElementById('todays-date');
let fiveDayDateInput = document.getElementsByClassName('five-day-dates')

// LOCAL STORAGE BUTTONS
let prevButtons = document.getElementsByClassName('prev-city');

// MY PERSONAL API KEY (OPENWEATHERMAP)
let weatherApiKey = "7547fb1c52fcd552488c6c46145ec65a";

/**********************************************************************************************************************/

// TODAY'S DATE
todaysDateInput.textContent = date;

// AUTOCOMPLETE SEARCH BAR (JQUERY)
$(function () {
    var citiesSearch = [
        'Abbotsford',
        'Boston',
        'Calgary',
        'Edmonoton',
        'New York',
        'Salt Lake City',
        'Toronto',
        'Vancouver',
    ];
    $('#search-input').autocomplete({
        source: citiesSearch,
    });
});

// SEARCH INPUT -> TO BE PUT INTO geoUrl
searchButton.addEventListener('click', (e) => {
    let searchInput = document.getElementById('search-input').value;
    e.preventDefault();

    // GEO LOCATION API VARIABLE
    let geoApiUrl = `https://api.geoapify.com/v1/geocode/search?city=${searchInput}&apiKey=ff9cc9a808974488a9620e7d4a7dd4d2`;

    // GET GEO API
    fetch(geoApiUrl, {
        method: 'GET',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // LATITUDE & LONGITUTE VARIABLES
            let latitude = data.features[0].geometry.coordinates[1];
            let longitude = data.features[0].geometry.coordinates[0];

            // INPUT CITY NAME
            let cityName = data.features[0].properties.city;
            let cityNameEl = document.getElementById('todays-city');
            cityNameEl.textContent = cityName;

            // CURRENT WEATHER AND FIVE DAY WEATHER API VARIABLES
            let weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${weatherApiKey}`;

            // GET WEATHER API 
            fetch(weatherApiUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    // MAKE WEATHER DIVS VIEWABLE
                    var currCityWeather = document.getElementById('city-weather');
                    var dailyCityWeather = document.getElementById('daily-forecast');
                    currCityWeather.setAttribute('style', 'opacity:1;');
                    dailyCityWeather.setAttribute('style', 'opacity:1;');

                    // 5 DAY FORECAST DATES
                    for (let i = 0; i < fiveDayDateInput.length; i++) {
                        fiveDayDateInput[i].textContent = moment.unix(data.daily[i].dt).format('dddd');
                    }

                    /* *****CURRENT WEATHER***** */
                    // INPUT WEATHER ICON
                    let currIcon = data.current.weather[0].icon;
                    let currIconEl = document.getElementById('todays-icon');
                    let iconImg = document.createElement('img');
                    iconImg.src = `https://openweathermap.org/img/wn/${currIcon}@4x.png`;
                    iconImg.setAttribute('style', 'max-width:40px;');
                    currIconEl.innerHTML = '';
                    currIconEl.appendChild(iconImg);
                    // INPUT TEMPERATURE
                    let currTemp = data.current.temp;
                    let currTempEl = document.getElementById('todays-temp');
                    currTempEl.textContent = currTemp;
                    // INPUT WIND SPEED
                    let currWind = data.current.wind_speed;
                    let currWindEl = document.getElementById('todays-wind');
                    currWindEl.textContent = currWind;
                    // INPUT HUMIDITY
                    let currHumid = data.current.humidity;
                    let currHumidEl = document.getElementById('todays-humid');
                    currHumidEl.textContent = currHumid;
                    // INPUT UV INDEX
                    let currUvi = data.current.uvi
                    let currUviEl = document.getElementById('todays-uvi');
                    currUviEl.textContent = currUvi;

                    // UVI STYLING
                    if (currUvi < 2.00) {
                        currUviEl.classList.remove('uvi-caution', 'uvi-danger');
                        currUviEl.classList.add('uvi-safe');
                    }
                    else if (currUvi >= 2.01 && currUvi <= 6.00) {
                        currUviEl.classList.remove('uvi-safe', 'uvi-danger');
                        currUviEl.classList.add('uvi-caution');
                    } 
                    else if (currUvi > 6.01) {
                        currUviEl.classList.remove('uvi-caution', 'uvi-safe');
                        currUviEl.classList.add('uvi-danger');
                    };

                    /* *****5 DAY FORECAST***** */
                    // INPUT ICONS
                    let dailyIconEl = document.querySelectorAll('.five-day-icon');
                    for (var i = 0; i < dailyIconEl.length; i++) {
                        let dailyIcon = data.daily[i].weather[0].icon;
                        let dailyIconImg = document.createElement('img');
                        dailyIconImg.src = `https://openweathermap.org/img/wn/${dailyIcon}@4x.png`;
                        dailyIconImg.setAttribute('style', 'max-width:40px;');
                        dailyIconEl[i].innerHTML = '';
                        dailyIconEl[i].appendChild(dailyIconImg);
                    }
                    // INPUT TEMPERATURES
                    let dailyTempEl = document.querySelectorAll('.five-day-temp');
                    for (var i = 0; i < dailyTempEl.length; i++) {
                        let dailyTemp = data.daily[i].temp.day;
                        dailyTempEl[i].textContent = dailyTemp;
                    }
                    // INPUT WIND SPEED
                    let dailyWindEl = document.querySelectorAll('.five-day-wind');
                    for (var i = 0; i < dailyWindEl.length; i++) {
                        let dailyWind = data.daily[i].wind_speed;
                        dailyWindEl[i].textContent = dailyWind;
                    }
                    // INPUT HUMIDITY
                    let dailyHumidEl = document.querySelectorAll('.five-day-humid');
                    for (var i = 0; i < dailyHumidEl.length; i++) {
                        let dailyHumid = data.daily[i].humidity;
                        dailyHumidEl[i].textContent = dailyHumid;
                    }

                    // SETTING LOCAL STORAGE INTO BUTTONS
                    localStorage.setItem('last-city', searchInput);
                    //var cityLog = JSON.parse(localStorage.getItem('last-city'));
                    let inputCity = localStorage.getItem('last-city');
                    console.log(searchInput);
                    console.log(inputCity);

                    prevButtons[0].innerHTML = inputCity;
                    console.log(prevButtons);

                    /*var cities = {
                        cityname: inputCity,
                    };

                    cityLog.push(cities);

                    prevButtons.innerHTML = cities;
                    localStorage.setItem('last-city', JSON.stringify(cityLog));

                    console.log(cities);

                    inputLocalStorage();*/

                });
        });
});