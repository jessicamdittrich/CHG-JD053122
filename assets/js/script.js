// SEARCH VARIABLES
let searchInput = document.querySelector('#search-input').value
let searchButton = document.querySelector('#search-button');
let citiesSearch = '';

// MY PERSONAL API KEYS
let weatherApiKey = "7547fb1c52fcd552488c6c46145ec65a";

// GEO LOCATION API VARIABLE
let geoUrl = "https://api.geoapify.com/v1/geocode/search?text=38%20Upper%20Montagu%20Street%2C%20Westminster%20W1H%201LJ%2C%20United%20Kingdom&apiKey=ff9cc9a808974488a9620e7d4a7dd4d2";

// CURRENT WEATHER AND FIVE DAY WEATHER API VARIABLES
//let weatherUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";
//let weatherUrlFiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&Appid=" + apiKey + "&units=imperial";

console.log(searchButton);

// SEARCH CITIES
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
});

  // GET API 
fetch(geoUrl, {
    method: 'GET',
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data.features[0].properties.city, data.features[0].properties.country);

    let searchCity = `${data.features[0].properties.city}, ${data.features[0].properties.country}`;

    // AUTOCOMPLETE SEARCH BAR
    $(function () {
        let citiesSearch = [
        searchCity,
        ];
        $('#search-input').autocomplete({
        source: citiesSearch,
        });
    });


  });