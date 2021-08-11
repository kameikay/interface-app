const arrows = document.querySelectorAll(".arrow-faq");
const cardResult = document.querySelector("#card-result");
const heads = document.querySelectorAll('.about-us__container__faq__container__header__head')

const tecnologiaText =
    "Utilizamos o software alemão Pv*Sol, reconhecido mundialmente quando o assunto é simulação de sistemas de energia solar. Essa tecnologia nos permite mais assertividade e precisão na hora de criar o projeto, fazendo com que a instalação seja segura e eficiente. Trabalhamos com materiais de qualidade para conquistarmos o maior potencial de produção energética para que você tenha tranquilidade e conforto à disposição.";
const manutencaoText =
    "Oferecemos serviços de manutenção corretiva ou emergencial, e ainda contratos de manutenção preventiva, que contemplam: Limpeza dos módulos, reaperto de conexões, verificação da integridade dos cabos e conexões elétricas, limpeza e verificação dos inversores, entre outros itens. Entre em contato conosco e conheça nos planos de manutenção.";
const equipeTecnicaText =
    "Temos uma equipe formada por profissionais experientes e capacitados para oferecer desde um projeto bem elaborado, atendendo a todas as normas de qualidade e segurança, a uma estrutura de atendimento diferenciada que envolve análise, projeto, instalação e manutenção. Possuímos um dos melhores softwares de dimensionamento de projetos fotovoltaicos do mercado internacional. O PV*SOL.";
const responsabilidadeText = `A Alliance se preocupa com seu ativo, possui um projeto adequado que atenda todas as normas de segurança e de qualidade. Seus funcionários e terceiros são treinados em NR 10 e NR35, são capacitados, qualificados e habilitados a prestarem o serviço com segurança e qualidade
Fornecemos ART dos nossos projetos e instalação. Fazemos avaliação do seu sistema estrutural para suportar o sistema sobre telhado.`;


heads.forEach((head) => {
    head.addEventListener("click", () => {
        head.classList.toggle("actived");

        if (head === heads[0]) {
            heads[1].classList.remove("actived");
            heads[2].classList.remove("actived");
            heads[3].classList.remove("actived");
        }
        if (head === heads[1]) {
            heads[0].classList.remove("actived");
            heads[2].classList.remove("actived");
            heads[3].classList.remove("actived");
        }
        if (head === heads[2]) {
            heads[1].classList.remove("actived");
            heads[0].classList.remove("actived");
            heads[3].classList.remove("actived");
        }
        if (head === heads[3]) {
            heads[1].classList.remove("actived");
            heads[2].classList.remove("actived");
            heads[0].classList.remove("actived");
        }
    });
});

arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
        arrow.classList.toggle("active");

        if (arrow === arrows[0]) {
            arrows[1].classList.remove("active");
            arrows[2].classList.remove("active");
            arrows[3].classList.remove("active");
            cardResult.innerHTML = tecnologiaText;
        }
        if (arrow === arrows[1]) {
            arrows[0].classList.remove("active");
            arrows[2].classList.remove("active");
            arrows[3].classList.remove("active");
            cardResult.innerHTML = manutencaoText;
        }
        if (arrow === arrows[2]) {
            arrows[1].classList.remove("active");
            arrows[0].classList.remove("active");
            arrows[3].classList.remove("active");
            cardResult.innerHTML = equipeTecnicaText;
        }
        if (arrow === arrows[3]) {
            arrows[1].classList.remove("active");
            arrows[2].classList.remove("active");
            arrows[0].classList.remove("active");
            cardResult.innerHTML = responsabilidadeText;
        }
    });
});
