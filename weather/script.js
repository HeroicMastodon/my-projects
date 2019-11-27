const apId = 'a2562e8c0a361ae54423c1402545f3a1';
const units = 'imperial';
const weatherQuery = 'http://api.openweathermap.org/data/2.5/weather?q=';
const forcastQuery = 'http://api.openweathermap.org/data/2.5/forecast?q=';

function constructQuery(type, value) {
    return type + value + ",US&units=imperial" + "&APPID=" + apId;
}

document.getElementById("weatherSubmit").addEventListener("click", function (event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "")
      return;
    console.log(value);
    const url = constructQuery(weatherQuery, value);
    console.log(url);
    fetch(url)
      .then(function(response) {
        return response.json();
      }).then(function(json) {	
        let results = "";
        results += '<h2 class="weatherHead">Weather in ' + json.name + "</h2>";
        for (let i=0; i < json.weather.length; i++) {
    results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<h2 class="tempHead">' + json.main.temp + " &deg;F</h2>"
        results += "<p>"
        for (let i=0; i < json.weather.length; i++) {
    results += json.weather[i].description
    if (i !== json.weather.length - 1)
      results += ", "
        }
        results += "</p>";
        document.getElementById("weatherResults").innerHTML = results;
      });
    const url2 = constructQuery(forcastQuery, value);
    console.log(url2);
      fetch(url2)
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          let forecast = "";
          for (let i=0; i < json.list.length; i++) {
      forecast += '<div><aside><h2>' + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm a') + "</h2></aside>";
      forecast += "<article><p>Temperature: " + json.list[i].main.temp + "</p>";
      forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/></article></div>'
          }
          document.getElementById("forecastResults").innerHTML = forecast;

        });
  });