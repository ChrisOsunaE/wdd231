const path = 'data/members.json';

const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');
const directoryContainer = document.querySelector('#directory-container');
let viewMode = 'grid';
let directoryData = [];

gridButton.addEventListener('click', () => {
    gridButton.classList.add('active');
    listButton.classList.remove('active');
    directoryContainer.classList.remove('list-view');
    viewMode = 'grid';
    displayDirectory(directoryData);
});

listButton.addEventListener('click', () => {
    listButton.classList.add('active');
    gridButton.classList.remove('active');
    directoryContainer.classList.add('list-view');
    viewMode = 'list';
    displayDirectory(directoryData);
});


async function getDirectoryData() {
    const response = await fetch(path);
    try {
        const data = await response.json();
        console.table(data);
        directoryData = data.companies;
        displayDirectory(directoryData);
    } catch (error) {
        console.error('Error fetching directory data:', error);
    }
}

const displayDirectory = (companies) => {
    directoryContainer.innerHTML = '';
    companies.forEach((company) => {
        let card = document.createElement('section');
        let logo = document.createElement('img');
        let name = document.createElement('h2');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let membershipLevel = document.createElement('p');
        membershipLevel.classList.add('membership-level');
        let visitWebsite = document.createElement('button');

        logo.src = company.image;
        logo.alt = `${company.name} Logo`;
        logo.loading = 'lazy';
        name.textContent = company.name;
        address.innerHTML = `📍 ${company.address}`;
        phone.innerHTML = `📞 ${company.phone}`;
        website.textContent = 'Visit Website';
        website.href = company.website;

        if (company.membership === 2) {
            card.classList.add('silver-member');
        } else if (company.membership === 3) {
            card.classList.add('gold-member');
        }

        if (viewMode === 'grid') {
            card.classList.add('directory-card');
            let cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');
            cardHeader.appendChild(logo);
            
            if (company.membership === 2) {
                membershipLevel.textContent = 'Silver';
                cardHeader.appendChild(membershipLevel);
            } else if (company.membership === 3) {
                membershipLevel.textContent = 'Gold';
                cardHeader.appendChild(membershipLevel);
            }
            
            card.appendChild(cardHeader);
        } else {
            card.classList.add('list-item');
        }

        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        visitWebsite.appendChild(website);
        card.appendChild(visitWebsite);

        directoryContainer.appendChild(card);
    });
};

getDirectoryData();