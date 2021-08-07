// Render Pages
exports.portfolioPage = async (request, response) => {
    response.render("portfolio", {
        title: "Interface | Portfólio",
    });
};

exports.showCases = (resquest, response) => {
    response.render('case', {
        title: 'Interface | Portfolio - Serviços'
    })
}

