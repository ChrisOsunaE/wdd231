const navButton = document.querySelector('#nav-button');
const navLinks = document.querySelector('#nav-bar');
const currentYear = new Date().getFullYear();


navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navLinks.classList.toggle('show');
});

document.getElementById('currentYear').textContent = currentYear;
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;