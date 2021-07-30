const footerMenuLinks = document.querySelectorAll(".footer-menu-item");

const footerSections = {
    hero: ".hero",
    quemSomos: ".quem-somos",
    beneficios: ".beneficios",
    comoFuncionam: ".como-funcionam",
    simule: ".simule",
    contato: ".contato",
};

function smoothFunction(elementTargetClass) {
    document.querySelector(`${elementTargetClass}`).scrollIntoView({
        behavior: "smooth",
    });
}

footerMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
        if (link.innerHTML === footerMenuLinks[0].innerHTML) {

            smoothFunction(footerSections.hero);
        }
        if (link.innerHTML === footerMenuLinks[1].innerHTML) {
            smoothFunction(footerSections.quemSomos);
        }
        if (link.innerHTML === footerMenuLinks[2].innerHTML) {
            smoothFunction(footerSections.beneficios);
        }
        if (link.innerHTML === footerMenuLinks[3].innerHTML) {
            smoothFunction(footerSections.comoFuncionam);
        }
        if (link.innerHTML === footerMenuLinks[4].innerHTML) {
            smoothFunction(footerSections.simule);
        }

    });
});

