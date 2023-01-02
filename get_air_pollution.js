import apiKey from "./key.js";

const airPollutionData = document.getElementById('air-pollution-data');

async function getAirPollution(cityName) {
    try {
        // Get latitude and longitude
        const geolocationResponse = await fetch (`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`);
        const geolocation = await geolocationResponse.json();
        const lat = geolocation[0]['lat'];
        const lon = geolocation[0]['lon'];

        // Air pollution data
        const response = await fetch (`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const airPollution = await response.json();

        airPollutionData.innerHTML = `<h3>Air Pollution</h3>
        <p>Air Pollution Index: ${airPollution['list'][0]['main']['aqi']}</p>
        <small>1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor</small>`;
    } catch (err) {
        data.innerHTML = '<h3 style="color:red">Something went wrong, check console for details...</h3>';
        console.error(err);
    }
}

export default getAirPollution;