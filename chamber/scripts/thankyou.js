const currentUrl = window.location.search;

const urlParams = new URLSearchParams(currentUrl);

const showInfo = document.querySelector('#results');
const showTimestamp = document.querySelector('#timestamp-result'); // <-- Nuevo contenedor

function getParam(paramName) {
    return urlParams.get(paramName) || "Not provided";
}

let rawDate = getParam('timestamp');
let formattedDate = "Not provided";
if (rawDate !== "Not provided") {
    formattedDate = new Date(rawDate).toLocaleString(); 
}

if (showInfo) {
    showInfo.innerHTML = `
      <p class="data-item">
        <span class="data-label">Applicant Name</span>
        <span class="data-value">${getParam('first-name')} ${getParam('last-name')}</span>
      </p>
      <p class="data-item">
        <span class="data-label">Business Name</span>
        <span class="data-value">${getParam('business')}</span>
      </p>
      <p class="data-item">
        <span class="data-label">Email Address</span>
        <span class="data-value">${getParam('email')}</span>
      </p>
      <p class="data-item">
        <span class="data-label">Mobile Phone</span>
        <span class="data-value">${getParam('phone')}</span>
      </p>
    `;
}

if (showTimestamp) {
    showTimestamp.innerHTML = `
        <p class="data-item">
          <span class="data-label">Timestamp</span>
          <span class="data-value">${formattedDate}</span>
        </p>
        <p class="data-item">
          <span class="data-label">Status</span>
          <span class="data-value pending">Pending Review</span>
        </p>
    `;
}

const summaryCard = document.querySelector('.summary');

const selectedLevel = getParam('membership-level');

if (summaryCard) {
    if (selectedLevel === 'gold') {
        summaryCard.classList.add('gold-member');
    } else if (selectedLevel === 'silver') {
        summaryCard.classList.add('silver-member');
    } else if (selectedLevel === 'bronze') {
        summaryCard.classList.add('bronze-member');
    } else {
        summaryCard.classList.add('non-membership'); 
    }
}