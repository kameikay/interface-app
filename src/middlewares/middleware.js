exports.middlewareError = (request, response, next) => {
    response.locals.errors = request.flash("errors");
    response.locals.success = request.flash("success");
    response.locals.user = request.session.user;
    next();
};

exports.checkCsrfError = (error, request, response, next) => {
    if (error && error.code === "EBADCSRFTOKEN") {
        return response.render("404", {
            title: "Interface | Página não encontrada",
        });
    }
    next();
};

exports.csrfMiddleware = (request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
};

exports.loginRequired = (request, response, next) => {
    if (!request.session.user) {
        request.session.save(() => response.redirect('/'))
        return
    }
    next()
}
