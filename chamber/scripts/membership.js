const membershipLevels = [
  {
    id: "np",
    title: "NP Membership",
    shortDescription: "For non-profit institutions.",
    cost: "No fee",
    benefits: "Includes basic listing in the chamber directory, access to monthly networking events, and opportunities to volunteer.",
    cssClass: "non-membership"
  },
  {
    id: "bronze",
    title: "Bronze Membership",
    shortDescription: "Entry-level business support.",
    cost: "$250 / year",
    benefits: "Includes basic directory listing, invitations to training seminars, and a 10% discount on chamber-sponsored events.",
    cssClass: "bronze-member"
  },
  {
    id: "silver",
    title: "Silver Membership",
    shortDescription: "Growth & networking focus.",
    cost: "$500 / year",
    benefits: "Includes all Bronze benefits, plus prime advertising spots in our newsletter and personalized business consulting sessions.",
    cssClass: "silver-member"
  },
  {
    id: "gold",
    title: "Gold Membership",
    shortDescription: "Maximum visibility & impact.",
    cost: "$1,000 / year",
    benefits: "Includes all Silver benefits, front-page spotlight on the Chamber homepage, VIP event access, and executive board eligibility.",
    cssClass: "gold-member"
  }
];

const container = document.getElementById('membership-cards-container');
const modal = document.getElementById('membership-modal');
const modalTitle = document.getElementById('modal-title');
const modalCost = document.getElementById('modal-cost-val');
const modalBenefits = document.getElementById('modal-benefits');
const closeModal = document.getElementById('close-modal');

membershipLevels.forEach(level => {
  const card = document.createElement('div');
  card.className = `membership-card ${level.cssClass}`;
  
  card.innerHTML = `
    <div class="membership-card-content">
      <h3>${level.title}</h3>
      <p>${level.shortDescription}</p>
    </div>
    <div class="membership-card-actions">
      <!-- Usamos un atributo data-* para guardar el ID del nivel -->
      <button type="button" class="view-benefits" data-id="${level.id}">View Benefits</button>
    </div>
  `;
  
  container.appendChild(card);
});

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('view-benefits')) {
    const levelId = e.target.getAttribute('data-id');
    const levelData = membershipLevels.find(l => l.id === levelId);
    
    if (levelData) {
      modalTitle.textContent = levelData.title;
      modalCost.textContent = levelData.cost;
      modalBenefits.textContent = levelData.benefits;
      
      modal.showModal();
    }
  }
});

closeModal.addEventListener('click', () => {
  modal.close();
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.close();
  }
});