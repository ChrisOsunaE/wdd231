const membersUrl = 'data/members.json';
const spotlightContainer = document.getElementById('spotlight-container');

async function getSpotlightMembers() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const data = await response.json();
            displaySpotlights(data.companies);
        } else {
            console.error("Error fetching members data.");
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

function displaySpotlights(companies) {
    const qualifiedMembers = companies.filter(company => company.membership === 2 || company.membership === 3);

    for (let i = qualifiedMembers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [qualifiedMembers[i], qualifiedMembers[j]] = [qualifiedMembers[j], qualifiedMembers[i]];
    }

    const numCards = Math.floor(Math.random() * 2) + 2; 
    const selectedMembers = qualifiedMembers.slice(0, numCards);

    spotlightContainer.innerHTML = "";

    selectedMembers.forEach(member => {
        const isGold = member.membership === 3;
        const membershipLevel = isGold ? "Gold Member" : "Silver Member";
        
        const memberClass = isGold ? "gold-member" : "silver-member";
        
        const card = document.createElement('div');
        card.className = `spotlight-card ${memberClass}`;
        
        card.innerHTML = `
            <!-- Conservamos tu clase del chip intacta -->
            <span class="membership-level">${membershipLevel}</span>
            
            <div class="spotlight-brand">
                <img src="${member.image}" alt="${member.name} Logo" loading="lazy" class="spotlight-logo">
                <h3 class="spotlight-title">${member.name}</h3>
            </div>
            
            <div class="spotlight-info">
                <p>📞 ${member.phone}</p>
                <p>📍 ${member.address}</p>
            </div>
            
            <a href="${member.website}" target="_blank" class="spotlight-btn">Visit Website</a>
        `;
        
        spotlightContainer.appendChild(card);
    });
}

getSpotlightMembers();