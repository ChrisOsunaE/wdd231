const apiKey = '0c438c9ace486369973e764628682c23';
const lat = 32.5331; 
const lon = -117.0382;
const units = 'metric';

const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#weather-desc');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const forecastContainer = document.querySelector('#forecast-container');
const eventsContainer = document.querySelector('.events-grid');
const spotlightsContainer = document.getElementById('spotlights-container');

function showLoadingStates() {
    eventsContainer.innerHTML = '<div class="loading">Loading events...</div>';
    spotlightsContainer.innerHTML = '<div class="loading">Loading featured businesses...</div>';
    if (forecastContainer) {
        forecastContainer.innerHTML = '<div class="loading">Loading forecast...</div>';
    }
}

async function fetchWeather() {
    try {
        const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
        const currentResponse = await fetch(currentUrl);
        
        if (!currentResponse.ok) {
            throw new Error('Weather API response not ok');
        }
        
        const currentData = await currentResponse.json();
        displayCurrentWeather(currentData);
        
        await fetchForecast();
        
    } catch (error) {
        console.log('Weather API Error:', error);
        showSampleWeather();
    }
}

function displayCurrentWeather(data) {
    currentTemp.textContent = Math.round(data.main.temp);
    weatherIcon.setAttribute('src', `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    
    let desc = data.weather[0].description;
    desc = desc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    weatherDesc.textContent = desc;
    
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
}

async function fetchForecast() {
    try {
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
        const response = await fetch(forecastUrl);
        
        if (!response.ok) {
            throw new Error('Forecast API response not ok');
        }
        
        const forecastData = await response.json();
        displayForecast(forecastData);
        
    } catch (error) {
        console.log('Forecast API Error:', error);
        showSampleForecast();
    }
}

function displayForecast(forecastData) {
    const dailyForecasts = [];
    const processedDays = new Set();
    
    forecastData.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dayKey = date.toDateString();
        
        if (!processedDays.has(dayKey) && date.getHours() >= 12 && date.getHours() <= 14) {
            dailyForecasts.push({
                date: date,
                temp: Math.round(item.main.temp),
                description: item.weather[0].description,
                icon: item.weather[0].icon
            });
            processedDays.add(dayKey);
        }
    });
    
    const threeDayForecast = dailyForecasts.slice(0, 3);
    
    forecastContainer.innerHTML = threeDayForecast.map(day => {
        const dayName = day.date.toLocaleDateString('en-US', { weekday: 'short' });
        const formattedDate = day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const description = day.description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        
        return `
            <div class="forecast-day">
                <div class="forecast-date">${dayName}<br>${formattedDate}</div>
                <div class="forecast-icon">
                    <img src="https://openweathermap.org/img/w/${day.icon}.png" alt="${description}">
                </div>
                <div class="forecast-temp">${day.temp}°C</div>
                <div class="forecast-desc">${description}</div>
            </div>
        `;
    }).join('');
}

async function fetchEvents() {
    try {
        const response = await fetch('data/events.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayEvents(data.events);
    } catch (error) {
        console.log('Error fetching events:', error);
        displaySampleEvents();
    }
}

function displayEvents(events) {
    const upcomingEvents = events.slice(0, 3);
    
    if (upcomingEvents.length === 0) {
        eventsContainer.innerHTML = '<div class="no-events">No upcoming events at this time.</div>';
        return;
    }
    
    eventsContainer.innerHTML = upcomingEvents.map(event => `
        <div class="event-card" data-category="${event.category.toLowerCase()}">
            <div class="event-category">${event.category}</div>
            <h3>${event.title}</h3>
            <p class="event-date">${event.date} | ${event.time}</p>
            <p class="event-location">📍 ${event.location}</p>
            <p class="event-description">${event.description}</p>
        </div>
    `).join('');
}


async function fetchSpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const members = await response.json();
        displaySpotlights(members);
    } catch (error) {
        console.log('Error fetching members:', error);
        displaySampleSpotlights();
    }
}

function displaySpotlights(members) {
    const featuredMembers = members.filter(member => 
        member.membershipLevel === 3 || member.membershipLevel === 2
    );
    
    const shuffledMembers = featuredMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffledMembers.slice(0, Math.min(3, shuffledMembers.length));
    
    if (selectedMembers.length === 0) {
        spotlightsContainer.innerHTML = '<div class="no-spotlights">No featured businesses at this time.</div>';
        return;
    }
    
    spotlightsContainer.innerHTML = selectedMembers.map(member => {
        const membershipLevel = getMembershipLevelText(member.membershipLevel);
        
        return `
            <div class="spotlight-card">
                <div class="spotlight-header">
                    <div class="member-info">
                        <h3>${member.name}</h3>
                        <span class="membership-badge ${membershipLevel.toLowerCase()}">${membershipLevel} Member</span>
                    </div>
                </div>
                <p class="industry">${member.industry}</p>
                <p class="description">${member.description}</p>
                <div class="contact-info">
                    <p class="contact">📍 ${member.address}</p>
                    <p class="contact">📞 ${member.phone}</p>
                    <p class="contact">📧 ${member.email}</p>
                    <p class="contact">🌐 <a href="${member.website}" target="_blank">Visit Website</a></p>
                </div>
            </div>
        `;
    }).join('');
}

function getMembershipLevelText(level) {
    switch(level) {
        case 3: return 'Gold';
        case 2: return 'Silver';
        case 1: return 'Bronze';
        default: return 'Member';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    showLoadingStates();
    fetchWeather();
    fetchEvents();
    fetchSpotlights();
});