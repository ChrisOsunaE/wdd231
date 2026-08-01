const currentYear = new Date().getFullYear();

document.getElementById('currentYear').textContent = currentYear;
document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;

const timestampField = document.getElementById('timestamp');
if (timestampField) {
  timestampField.value = new Date().toISOString();
}