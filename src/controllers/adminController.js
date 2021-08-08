const Portfolio = require("../models/PortfolioModel");

exports.adminPage = async (request, response) => {
    response.render("admin", {
        title: "Interface | Admin",
    });
};

exports.createPost = async (request, response) => {
    response.render("adminNewPost", {
        title: "Interface | Admin",
    });
};

exports.register = async (request, response) => {
    try {
        const portfolio = new Portfolio(request.body);
        await portfolio.register();

        if (portfolio.errors.length > 0) {
            request.flash("errors", portfolio.errors);
            request.session.save(function () {
                return response.redirect("/user/create-post");
            });
            return;
        }
        request.flash("success", "Portfólio registrado com sucesso");
        request.session.save(function () {
            return response.redirect("/user/create-post");
        });
    } catch (error) {
        console.log(error);
        return response.render("404", {
            title: 'Interface | Página não encontrada'
        });
    }
};
