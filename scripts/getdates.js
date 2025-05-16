const currentyear = document.getElementById('currentyear');
currentyear.textContent = new Date().getFullYear();

const lastModified = document.getElementById('lastModified');
lastModified.textContent = document.lastModified;