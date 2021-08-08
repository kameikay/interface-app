const PortfolioRepository = require("../repositories/PortfolioRepository");

exports.index = async (request, response) => {
    const portfolio = await PortfolioRepository.findAll();
    response.json(portfolio)
    // return portfolio
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
        category,
        address,
        description,
    });

    response.json(caso);
};

exports.update = async (request, response) => {
    const { id } = request.params;
    const { name, address, description } = request.body;

    const casoExists = await PortfolioRepository.findById(id);

    if (!casoExists) {
        return response.status(404).json({ error: "Case not found" });
    }

    if (!name) {
        return response.status(400).json({ error: "Name is required" });
    }

    const caso = await PortfolioRepository.update(id, {
        name,
        address,
        description,
    });

    response.json(caso);
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