const home = document.querySelector('.home');
const settings = document.querySelector('.settings')
const iconHome = document.querySelector('.icon-home');
const iconSettings = document.querySelector('.icon-settings');
const body = document.body;
const closeBtn = document.querySelector('.close-btn');

let isOpen = false

const openModal = () => {
    if (!isOpen) {
        body.classList.add('modal-open');
        settings?.classList.add('btn-active');
        iconSettings?.setAttribute('href', './src/svg/symbol-defs.svg#icon-Setting-2')
        iconHome?.setAttribute('href', './src/svg/symbol-defs.svg#icon-Home-1');
        home?.classList.remove('btn-active');
    } 
}

const closeModal = () => {
    body.classList.remove('modal-open');
    settings?.classList.remove('btn-active');
    iconSettings?.setAttribute('href', './src/svg/symbol-defs.svg#icon-Setting');
    iconHome?.setAttribute('href', './src/svg/symbol-defs.svg#icon-Home-2');
    home?.classList.add('btn-active');
}

settings?.addEventListener('click', openModal);
home?.addEventListener('click', closeModal);
closeBtn?.addEventListener('click', closeModal);

export { };