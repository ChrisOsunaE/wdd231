const currentUrl = window.location.href;

const urlParams = new URLSearchParams(window.location.search);

const userName = urlParams.get('fullName');

if (userName) {
  const firstName = userName.split(' ')[0]; 
  document.querySelector('#user-name').textContent = firstName;
}