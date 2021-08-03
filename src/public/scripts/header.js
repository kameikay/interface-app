const menuMobile = document.querySelector(".menu-mobile");
const menuItems = document.querySelector(".menu-items");
const menuLinks = document.querySelectorAll(".menu-items li");
const header = document.querySelector('header')


// Open hamburger menu
function handlerMenu() {
    menuItems.classList.toggle("active");
    menuMobile.classList.toggle("menu-mobile-open");
}

menuMobile.addEventListener("click", handlerMenu);

menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
            handlerMenu();
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 72) {
        header.style.background = 'rgba(28, 49, 55, 0.55)'
    }

    if (window.pageYOffset === 0) {
        header.style.background = 'rgba(28, 49, 55, 0.25)'
    }
})