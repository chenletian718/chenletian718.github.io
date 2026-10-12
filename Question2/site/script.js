const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-menu');
if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }));
}
document.querySelector('#year').textContent = new Date().getFullYear();
