const { v4 } = require("uuid");


let portfolio = [
    {
        id: v4(),
        name: "Casa Residencial",
        category: "placas",
        address: "R. Conrado Schiffer, 20",
        description: "Instalação de 12 (doze) placas solares",
        // photo,
        // video
    },
    {
        id: v4(),
        name: "Casa Comercial",
        category: "placas",
        address: "R. Aldo Vergani, 123",
        description: "Instalação de 4 (quatro) placas solares",
        // photo,
        // video
    },
    {
        id: v4(),
        name: "Indústria de Farinha",
        category: "chuva",
        address: "Rodovia BR 233, km 12",
        description: "Instalação de 123 (cento e vinte e três) placas solares",
        // photo,
        // video
    },
];

exports.findAll = () => {
    return new Promise((resolve) => resolve(portfolio));
};

exports.findById = (id) => {
    return new Promise((resolve) =>
        resolve(portfolio.find((caso) => caso.id === id))
    );
};

exports.delete = (id) => {
    return new Promise((resolve) => {
        portfolio = portfolio.filter((caso) => caso.id !== id);

        resolve();
    });
};

exports.create = ({ name, category, address, description }) => {
    return new Promise((resolve) => {
        const newCaso = {
            id: v4(),
            name,
            category,
            address,
            description,
        };

        portfolio.push(newCaso);

        resolve(newCaso);
    });
};

exports.update = (id, { name, address, description }) => {
    return new Promise((resolve) => {
        const updatedCaso = {
            id,
            name,
            address,
            description,
        };

        portfolio = portfolio.map((caso) =>
            caso.id === id ? updatedCaso : caso
        );

        resolve(updatedCaso);
    });
};
