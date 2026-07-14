const gridButton = document.querySelector('#grid-button');
const listButton = document.querySelector('#list-button');

gridButton.addEventListener('click', () => {
    gridButton.classList.add('active');
    listButton.classList.remove('active');
});

listButton.addEventListener('click', () => {
    listButton.classList.add('active');
    gridButton.classList.remove('active');
});
