const path = 'data/members.json';

const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');
const directoryContainer = document.querySelector('#directory-container');
let viewMode = 'grid';

gridButton.addEventListener('click', () => {
    gridButton.classList.add('active');
    listButton.classList.remove('active');
    directoryContainer.classList.remove('list-view');
    viewMode = 'grid';
});

listButton.addEventListener('click', () => {
    listButton.classList.add('active');
    gridButton.classList.remove('active');
    directoryContainer.classList.add('list-view');
    viewMode = 'list';
});


async function getDirectoryData() {
    const response = await fetch(path);
    try {
        const data = await response.json();
        console.table(data);
        displayDirectory(data.companies);
    } catch (error) {
        console.error('Error fetching directory data:', error);
    }
}

const displayDirectory = (companies) => {
    companies.forEach((company) => {
        let card = document.createElement('section');
        let logo = document.createElement('img');
        let name = document.createElement('h2');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let membershipLevel = document.createElement('p');
        membershipLevel.classList.add('membership-level');

        logo.src = company.image;
        name.textContent = company.name;
        address.textContent = `Address: ${company.address}`;
        phone.textContent = `Phone: ${company.phone}`;
        website.textContent = company.website;
        website.href = company.website;

        if (viewMode === 'grid') {
            card.classList.add('directory-card');
            let cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');
            cardHeader.appendChild(logo);
            
            if (company.membership === 2) {
                membershipLevel.textContent = 'Silver';
                card.classList.add('silver-member');
                cardHeader.appendChild(membershipLevel);
            } else if (company.membership === 3) {
                membershipLevel.textContent = 'Gold';
                card.classList.add('gold-member');
                cardHeader.appendChild(membershipLevel);
            }

            
            card.appendChild(cardHeader);
        } else {
            card.classList.add('list-item');
        }

        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        directoryContainer.appendChild(card);
    });
};

getDirectoryData();