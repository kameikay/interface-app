const menuMobile = document.querySelector(".menu-mobile");
const menuItems = document.querySelector(".menu-items");
const menuLinks = document.querySelectorAll(".menu-items li");
const header = document.querySelector('header')

const sections = {
    hero: ".hero",
    quemSomos: ".quem-somos",
    beneficios: ".beneficios",
    comoFuncionam: ".como-funcionam",
    simule: ".simule",
    portfolio: ".portfolio",
    contato: ".contato",
};

function smoothFunction(elementTargetClass) {
    document.querySelector(`${elementTargetClass}`).scrollIntoView({
        behavior: "smooth",
    });
}
// Open hamburger menu
function handlerMenu() {
    menuItems.classList.toggle("active");
    menuMobile.classList.toggle("menu-mobile-open");
}

menuMobile.addEventListener("click", handlerMenu);

menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (link.innerHTML === menuLinks[0].innerHTML) {
            smoothFunction(sections.hero);
            handlerMenu();
        }
        if (link.innerHTML === menuLinks[1].innerHTML) {
            smoothFunction(sections.quemSomos);
            handlerMenu();
        }
        if (link.innerHTML === menuLinks[2].innerHTML) {
            smoothFunction(sections.beneficios);
            handlerMenu();
        }
        if (link.innerHTML === menuLinks[3].innerHTML) {
            smoothFunction(sections.comoFuncionam);
            handlerMenu();
        }
        if (link.innerHTML === menuLinks[4].innerHTML) {
            smoothFunction(sections.simule);
            handlerMenu();
        }
        if (link.innerHTML === menuLinks[5].innerHTML) {
            smoothFunction(sections.portfolio);
            handlerMenu();
        }
        if (link.innerHTML === menuLinks[6].innerHTML) {
            smoothFunction(sections.contato);
            handlerMenu();
        }
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