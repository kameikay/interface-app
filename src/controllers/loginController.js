exports.loginForm = (request, response) => {
    response.render("login", {
        title: "Interface | Login",
    });
};

exports.login = (request, response) => {
    console.log(request.body);
};
