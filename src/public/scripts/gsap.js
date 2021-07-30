document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    var tl = gsap.timeline();

    // Navbar
    tl.from(
        ".menu-items li",
        {
            duration: 0.5,
            x: 100,
            opacity: 0,
            ease: "power3.out",
            stagger: { each: 0.4 },
        },
        "-=0.8"
    );
    // Hero
    tl.from(".hero-section__display-title", {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: "power3.out",
    })
        .from(
            ".hero-section__display-subtitle",
            {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: "power3.out",
            },
            "-=0.8"
        )
        .from(
            ".hero-section__display-button",
            {
                duration: 0.7,
                y: 50,
                opacity: 0,
                ease: "power3.out",
            },
            "-=0.8"
        );

    // Quem-somos
    gsap.from(
        ".quem-somos-nos__container__text",
        {
            duration: 1,
            x: -50,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".quem-somos-nos__container__text",
            },
        },
        "-=0.8"
    );
    gsap.from(
        ".quem-somos-nos__container__img",
        {
            duration: 1,
            x: 50,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: {
                trigger: ".quem-somos-nos__container__img",
            },
        },
        "-=0.8"
    );

    // Benefícios
    gsap.from(
        ".beneficios-title",
        {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".beneficios-title",
            },
        },
        "-=0.8"
    );
    gsap.from(
        ".beneficios-subtitle",
        {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".beneficios-subtitle",
            },
        },
        "-=0.8"
    );
    gsap.from(
        ".beneficios__container__cards__card",
        {
            duration: 1,
            y: 200,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".beneficios__container__cards__card",
            },
        },
        "-=0.8"
    );

    // Como funcionam

    gsap.from(
        ".como-funcionam__container__title",
        {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".como-funcionam__container__title",
            },
        },
        "-=0.8"
    );
    gsap.from(
        ".como-funcionam__container__description__img",
        {
            duration: 1,
            x: -50,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".como-funcionam__container__description__img",
            },
        },
        "-=0.8"
    );
    gsap.from(
        ".como-funcionam__container__description__text",
        {
            duration: 1,
            x: 50,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".como-funcionam__container__description__text",
            },
        },
        "-=0.8"
    );

    // Simule
    gsap.from(
        ".simule__container",
        {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".simule__container",
            },
        },
        "-=0.8"
    );

    // CONTATO
    gsap.from(
        ".contato__container__inside__infos__form",
        {
            duration: 1,
            x: -50,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".contato__container__inside__infos__form",
            },
        },
        "-=0.8"
    );
    gsap.from(
        ".contato__container__inside__msg",
        {
            duration: 1,
            x: 50,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: ".contato__container__inside__msg",
            },
        },
        "-=0.8"
    );
});
