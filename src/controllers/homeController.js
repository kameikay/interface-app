exports.homePage = (request, response) => {
    response.render('index', {
        title: 'Interface | Soluções Inteligentes'
    })
}