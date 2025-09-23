const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphets() {
    const response = await fetch(url);
    const data = await response.json();
    // console.table(data.prophets);
    // console.log(data.prophets);
    displayProphets(data.prophets);
}

function displayProphets(prophets) {
    prophets.forEach(prophet => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let portairt = document.createElement('img');
        let dateOfBirth = document.createElement('p');
        let placeOfBirth = document.createElement('p');

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        portairt.setAttribute('src', prophet.imageurl);
        portairt.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}`);
        portairt.setAttribute('loading', 'lazy');
        portairt.setAttribute('width', '340');
        portairt.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(dateOfBirth);
        dateOfBirth.textContent = `Date of Birth: ${prophet.birthdate}`;
        card.appendChild(placeOfBirth);
        placeOfBirth.textContent = `Place of Birth: ${prophet.birthplace}`;
        card.appendChild(portairt);
        card.setAttribute('class', 'prophet');

        cards.appendChild(card);
    });
}
getProphets()