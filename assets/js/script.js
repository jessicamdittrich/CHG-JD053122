// SEARCH VARIABLES
//let searchInput = 'New York';
let searchButton = document.querySelector('#search-button');
let citiesSearch = '';

// DATE VARIABLES
let date = new Date().toDateString();
var todaysDateInput = document.getElementById('todays-date');
var fiveDayDateInput = document.getElementsByClassName('five-day-dates')

// MY PERSONAL API KEY (OPENWEATHERMAP)
let weatherApiKey = "7547fb1c52fcd552488c6c46145ec65a";

// CURRENT WEATHER AND FIVE DAY WEATHER API VARIABLES
//let weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly,alerts&appid=${weatherApiKey}`;
//let weatherUrlFiveDay = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitute}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${weatherApiKey}`; only "daily"

/**********************************************************************************************************************/

// TODAY'S DATE
todaysDateInput.textContent = date;

// SEARCH INPUT -> TO BE PUT INTO geoUrl
searchButton.addEventListener('click', (e) => {
    let searchInput = document.getElementById('search-input').value;
    e.preventDefault();
    console.log(searchInput);

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

            // AUTOCOMPLETE SEARCH BAR (JQUERY) - NEED TO DO STILL**************************************************************
            $(function () {
                let citiesSearch = [
                    searchInput,
                ];
                $('#search-input').autocomplete({
                    source: citiesSearch,
                });
            });

            // CURRENT WEATHER AND FIVE DAY WEATHER API VARIABLES
            let weatherApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&exclude=minutely,hourly,alerts&appid=${weatherApiKey}`;

            // GET WEATHER API 
            fetch(weatherApiUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {

                    // 5 DAY FORECAST DATES - NOT WORKING***********************************************************************************
                    for (let i = 0; i < fiveDayDateInput.length; i++) {
                        fiveDayDateInput[i].textContent = moment.unix(data.daily[i].dt).format('dddd');
                        //console.log(fiveDayDateInput[0]);
                        //console.log(date++);
                    }

                    console.log(data);
                    /* *****CURRENT WEATHER***** */
                    // INPUT WEATHER ICON
                    let currIcon = data.current.weather[0].icon;
                    let currIconEl = document.getElementById('todays-icon');
                    let iconImg = document.createElement('img');
                    iconImg.src = `https://openweathermap.org/img/wn/${currIcon}@4x.png`;
                    iconImg.setAttribute('style', 'max-width:30px;');
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

                    /* *****5 DAY FORECAST***** */
                    // INPUT ICONS
                    let dailyIconEl = document.querySelectorAll('.five-day-icon');
                    for (var i = 0; i < dailyIconEl.length; i++) {
                        let dailyIcon = data.daily[i].weather[0].icon;
                        let dailyIconImg = document.createElement('img');
                        dailyIconImg.src = `https://openweathermap.org/img/wn/${dailyIcon}@4x.png`;
                        dailyIconImg.setAttribute('style', 'max-width:30px;');
                        dailyIconEl[i].innerHTML = '';
                        dailyIconEl[i].appendChild(dailyIconImg);
                    }
                    // INPUT TEMPERATURES
                    let dailyTempEl = document.querySelectorAll('.five-day-temp');
                    console.log(data.daily);
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
                });

        });

});