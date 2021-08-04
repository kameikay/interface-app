exports.checkCsrfError = (error, request, response, next) => {
    if (error && error.code === 'EBADCSRFTOKEN') {
        return response.render('404', {
            title: 'Interface | Página não encontrada'
        })
    }
}

exports.csrfMiddleware = (request, response, next) => {
    response.locals.csrfToken = request.csrfToken()

    next()
}