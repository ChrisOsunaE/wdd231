import { places } from '../data/places.mjs';

document.addEventListener("DOMContentLoaded", () => {
    
    const msInOneDay = 84600000;
    let currentDate = Date.now();
    const displayMsg = document.getElementById("visit-message");
    
    let savedVisit = window.localStorage.getItem("lastVisitChamber");

    if (!savedVisit) {
        displayMsg.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        let timeDiff = currentDate - Number(savedVisit);
        let daysPassed = Math.floor(timeDiff / msInOneDay);

        if (daysPassed < 1) {
            displayMsg.textContent = "Back so soon! Awesome!";
        } else {
            let dayText = "days";
            if (daysPassed === 1) {
                dayText = "day";
            }
            displayMsg.textContent = "You last visited " + daysPassed + " " + dayText + " ago.";
        }
    }
    
    localStorage.setItem("lastVisitChamber", currentDate);


    const gridBox = document.getElementById("discover-container");

    places.forEach((place, index) => {
      let newCard = document.createElement("div");
      newCard.className = "discover-card"; 

      let loadingAttr = index === 0 ? 'fetchpriority="high"' : 'loading="lazy"';

      let cardHTML = `
          <figure>
              <img src="${place.image}" alt="${place.name}" width="300" height="200" ${loadingAttr}>
          </figure>
          <div class="card-content">
              <h2>${place.name}</h2>
              <address>${place.address}</address>
              <p>${place.description}</p>
              <button>Learn more</button>
          </div>
      `;
      
      newCard.innerHTML = cardHTML;
      gridBox.appendChild(newCard);
  });

});