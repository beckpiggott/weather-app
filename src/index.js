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



function showTemperature(response) {
  document.querySelector("#temp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#windSpeed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#cityName").innerHTML = response.data.name;
}

function searchCity(city) {
   let apiKey = "d5d9b9ab70b425b5936beab173bca281";
   let units= "metric";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

   axios.get(apiUrl).then(showTemperature);
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
}

function getCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("Sydney"); 

let currentLocation = document.querySelector("#currentLocation");
currentLocation.addEventListener("click", getCurrentWeather);


