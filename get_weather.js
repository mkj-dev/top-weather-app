import apiKey from "./key.js";

const city = document.getElementById('city');
const getCityBtn = document.getElementById('get-city-btn');
const data = document.getElementById('data');

getCityBtn.addEventListener('click', () => {
    getWeather(city.value);
});

async function getWeather(cityName) {
    const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
    const weatherData = await response.json();

    console.log(weatherData);
    console.log(weatherData.main['temp']);
    console.log(weatherData.weather[0]['description']);

    data.innerHTML = `<h3>City: ${weatherData.name}</h3><p>Temperature: ${weatherData.main['temp']}</p><p>Weather: ${weatherData.weather[0]['description']}</p>`;
}