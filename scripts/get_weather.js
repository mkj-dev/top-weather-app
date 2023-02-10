import apiKey from "./key.js";
import getAirPollution from "./get_air_pollution.js";

// Form
const city = document.getElementById('city');
const getCityBtn = document.getElementById('get-city-btn');

// Data section
const data = document.getElementById('data');
const temperatureData = document.getElementById('temperature-data');
const otherData = document.getElementById('other-data');

// City name
const cityNameHeading = document.createElement('h3');
cityNameHeading.setAttribute('id', 'city-name')

getCityBtn.addEventListener('click', () => {
    getWeather(city.value);
    getAirPollution(city.value);
});

async function getWeather(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        const weatherData = await response.json();

        cityNameHeading.innerText = `City: ${weatherData.name}`;
        data.insertAdjacentElement('beforebegin', cityNameHeading);
        
        temperatureData.innerHTML = `<p>Temperature: ${weatherData.main['temp']} &#8451;</p>
        <p>Feels like: ${weatherData.main['feels_like']} &#8451;</p>
        <p>Min. temperature: ${weatherData.main['temp_min']} &#8451;</p> 
        <p>Max. temperature: ${weatherData.main['temp_max']} &#8451;</p>`;

        otherData.innerHTML = `<p>Humidity: ${weatherData.main['humidity']}%</p>
        <p>Cloudiness: ${weatherData.clouds['all']}%</p>
        <p>Wind speed: ${weatherData.wind['speed']} m/s</p>
        <p>Weather: ${weatherData.weather[0]['description']}</p>
        <div class='weather-img'>
            <img src="http://openweathermap.org/img/wn/${weatherData.weather[0]['icon']}@4x.png" />
        </div>`
    } catch (err) {
        data.innerHTML = '<h3 style="color:red">Something went wrong, check console for details...</h3>';
        console.error(err);
    }
}