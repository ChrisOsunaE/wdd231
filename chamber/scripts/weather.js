const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const forecastContainer = document.querySelector("#forecast-container");

const url = "https://api.openweathermap.org/data/2.5/weather?lat=32.53&lon=-117.01&appid=0aaaa741a60871b01c3617de6c076e36&units=metric";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=32.53&lon=-117.01&appid=0aaaa741a60871b01c3617de6c076e36&units=metric";

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

async function forecastFetch() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayWeather(weatherData) {
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong> &deg;C`;
    const iconsrc = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const desc = weatherData.weather[0].description;
    weatherIcon.src = iconsrc;
    captionDesc.innerHTML = desc;
}

function displayForecast(data) {
    const forecastList = data.list;
    forecastContainer.innerHTML = "";
    
    for (let i = 0; i < 24; i += 8) {
        const forecast = forecastList[i];
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString("en-US", { weekday: "short" });
        const temp = forecast.main.temp.toFixed(0);
        const iconSrc = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        
        forecastContainer.innerHTML += `
            <div class="forecast-item">
                <p>${day}</p>
                <img src="${iconSrc}" alt="${forecast.weather[0].description}">
                <p>${temp}&deg;C</p>
            </div>
        `;
    }   
}

apiFetch();
forecastFetch();