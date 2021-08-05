const menuMobile = document.querySelector(".menu-mobile");
const menuMobileSpan = document.querySelectorAll(".menu-mobile span");
const menuItems = document.querySelector(".menu-items");
const menuLinks = document.querySelectorAll(".menu-items li");
const menuAnchor = document.querySelectorAll(".menu-items li a");
const header = document.querySelector("header");
const title = document.title;

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

if (title === "Interface | Soluções Sustentáveis" || title === "Interface | Login") {
    header.style.background = "transparent";
    menuAnchor[0].style.borderBottom = "3px solid #64B42D";
} else {
    menuAnchor.forEach((e) => (e.style.color = "#1d99a7"));
    menuMobileSpan.forEach((e) => (e.style.background = "#1d99a7"));

}

if (title === "Interface | Sobre nós") {
    menuAnchor[1].style.borderBottom = "3px solid #64B42D";
}
if (title === "Interface | Portfólio") {
    menuAnchor[2].style.borderBottom = "3px solid #64B42D";
}

if (title === "Interface | Simulação") {
    menuAnchor[3].style.borderBottom = "3px solid #64B42D";
}


window.addEventListener("scroll", () => {
    if (window.pageYOffset > 72) {
        header.style.background = "rgba(28, 49, 55, 0.30)";
        menuAnchor.forEach((e) => (e.style.color = "#fdfdfd"));
        menuMobileSpan.forEach((e) => (e.style.background = "#fdfdfd"));

    }

    if (window.pageYOffset === 0) {
        header.style.background = "transparent";

        if (title !== "Interface | Soluções Sustentáveis") {
            menuAnchor.forEach((e) => (e.style.color = "#1d99a7"));
            menuMobileSpan.forEach((e) => (e.style.background = "#1d99a7"));
            
        }
    }
});
