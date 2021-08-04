exports.checkCsrfError = (error, request, response, next) => {
    if (error && error.code === 'EBADCSRFTOKEN') {
        return res.render('404')
    }
}