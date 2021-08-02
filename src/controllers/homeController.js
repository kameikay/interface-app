exports.homePage = (request, response) => {
    response.render("index", {
        title: "Interface | Soluções Inteligentes",
    });

    
};

// Email

exports.sendEmail = (request, response) => {
    const {name, email, verificacao, message} = request.body;
    // {
    //     name: 'Victor Seiji Kamei Kay',
    //     email: 'victork@alunos.unicesumar.edu.br',
    //     verificacao: 'on',
    //     message: 'asddad12312'
    //   }

    
};

