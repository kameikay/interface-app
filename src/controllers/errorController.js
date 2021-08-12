exports.errorPage = (request, response) => {
    response.render('404', {
        title: 'Interface | Página não encontrada'
    })
}