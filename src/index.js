let todaysDate = new Date();

let currentDate = document.querySelector("#current-date");
let currentTime = document.querySelector("#current-time");

let date = todaysDate.getDate();
let hours = todaysDate.getHours();
  if(hours < 10) {
    hours = `0${hours}`;
  }
let minutes = todaysDate.getMinutes();
  if(minutes <10) {
    minutes = `0${minutes}`;
  }

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[todaysDate.getDay()];

let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let month = months[todaysDate.getMonth()];

currentDate.innerHTML = `${day} ${date} ${month}`;
currentTime.innerHTML = `${hours}:${minutes}`;


function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if(hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes()
  if(minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function showTemperature(response) {

  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#windSpeed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#cityName").innerHTML = response.data.name;
  
  celsiusTemperature = response.data.main.temp;

  let weatherIcon = document.querySelector("#weatherIcon");
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${ response.data.weather[0].icon}@2x.png`);
  weatherIcon.setAttribute("alt", response.data.weather[0].description);
}

function showForecast(response) {
  let forecast = document.querySelector("#forecast");
  let hourlyForecast = response.data.list[0];
  

    forecast.innerHTML = `
           <div class="col-2">
            ${formatHours(hourlyForecast.dt * 1000)};
            </br>
            <img src="http://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}@2x.png">
            </br>
            ${Math.round(hourlyForecast.main.temp_max)}°c
           </div>
           `

  hourlyForecast = response.data.list[1];
    forecast.innerHTML += `
           <div class="col-2">
            ${formatHours(hourlyForecast.dt * 1000)};
            </br>
            <img src="http://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}@2x.png">
            </br>
            ${Math.round(hourlyForecast.main.temp_max)}°c
           </div>
           `

hourlyForecast = response.data.list[2];
    forecast.innerHTML += `
           <div class="col-2">
            ${formatHours(hourlyForecast.dt * 1000)};
            </br>
            <img src="http://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}@2x.png">
            </br>
            ${Math.round(hourlyForecast.main.temp_max)}°c
           </div>
           `

  hourlyForecast = response.data.list[3];
    forecast.innerHTML += `
           <div class="col-2">
            ${formatHours(hourlyForecast.dt * 1000)};
            </br>
            <img src="http://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}@2x.png">
            </br>
            ${Math.round(hourlyForecast.main.temp_max)}°c
           </div>
           ` 
           
  hourlyForecast = response.data.list[4];
    forecast.innerHTML += `
           <div class="col-2">
            ${formatHours(hourlyForecast.dt * 1000)};
            </br>
            <img src="http://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}@2x.png">
            </br>
            ${Math.round(hourlyForecast.main.temp_max)}°c
           </div>
           `   
           
 hourlyForecast = response.data.list[5];
    forecast.innerHTML += `
           <div class="col-2">
            ${formatHours(hourlyForecast.dt * 1000)};
            </br>
            <img src="http://openweathermap.org/img/wn/${hourlyForecast.weather[0].icon}@2x.png">
            </br>
            ${Math.round(hourlyForecast.main.temp_max)}°c
           </div>
           `           
}

function searchCity(city) {
   let apiKey = "d5d9b9ab70b425b5936beab173bca281";
   let units= "metric";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

   axios.get(apiUrl).then(showTemperature);

   apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
   axios.get(apiUrl).then(showForecast);
}


function handleSubmit(event) {
  event.preventDefault();
  
  let city = document.querySelector("#inputPassword2").value;
  searchCity(city);
} 
 
function searchLocation(position) {
  let apiKey = "d5d9b9ab70b425b5936beab173bca281";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric"; 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
   axios.get(apiUrl).then(showForecast);
}

function getCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


function showFarenheitTemperature(event) {
  event.preventDefault();
  let farenheitTemperature = (celsiusTemperature * 9)/ 5 + 32;
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(farenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temp");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", showFarenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentWeather);

searchCity("Sydney"); 

