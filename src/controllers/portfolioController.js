const PortfolioRepository = require("../repositories/PortfolioRepository");

// Render Pages
exports.portfolioPage = (request, response) => {
    response.render("portfolio", {
        title: "Interface | Portfólio",
    });
};

exports.showCases = (resquest, response) => {
    response.render('case', {
        title: 'Interface | Portfolio - Serviços'
    })
}

// Cases (Serviços)
exports.index = async (request, response) => {
    const portfolio = await PortfolioRepository.findAll();

    response.json(portfolio);
};

exports.show = async (request, response) => {
    const { id } = request.params;

    const caso = await PortfolioRepository.findById(id);

    if (!caso) {
        return response.status(404).json({ error: "Case not found" });
    }

    response.json(caso);
};

exports.store = async (request, response) => {
    const { name, address, description } = request.body;

    if (!name) {
        return response.status(400).json({ error: "Name is required" });
    }

    const caso = await PortfolioRepository.create({
        name,
        address,
        description,
    });

    response.json(caso);
};

exports.update = async (request, response) => {
    const { id }= request.params
    const { name, address, description} = request.body

    const casoExists = await PortfolioRepository.findById(id);

    if (!casoExists) {
        return response.status(404).json({ error: "Case not found" });
    }

    if (!name) {
        return response.status(400).json({ error: "Name is required" });
    }

    const caso = await PortfolioRepository.update(id, {
        name, address, description
    })

    response.json(caso)
};

exports.delete = async (request, response) => {
    const { id } = request.params;

    const caso = await PortfolioRepository.findById(id);

    if (!caso) {
        return response.status(404).json({ error: "Case not found" });
    }

    await PortfolioRepository.delete(id);

    response.sendStatus(204);
};
