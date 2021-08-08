const Portfolio = require("../models/PortfolioModel");

// Render Pages
exports.portfolioPage = async (request, response) => {
    try {
        const portfolio = await Portfolio.showAll();

        response.render("portfolio", {
            title: "Interface | Portfólio",
            portfolio,
        });
    } catch (error) {
        console.log(error);
        response.render("404", {
            title: "Interface | Página não encontrada",
        });
    }
};

exports.showCases = async (resquest, response) => {
    response.render('case', {
        title: 'Interface | Portfolio - Serviços'
    })
}

