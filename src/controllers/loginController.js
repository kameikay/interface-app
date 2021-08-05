const Login = require("../models/LoginModel");

// LoginModel.create({
//     login: 'interface-admin',
//     password: '@interface_admin'
// })

exports.loginForm = (request, response) => {
    if (request.session.user) {
        return response.render("admin", {
            title: "Interface | Admin",
        });
    }
    return response.render("login", {
        title: "Interface | Login",
    });
};


exports.login = async (request, response) => {
    try {
        const login = new Login(request.body);
        await login.login();

        if (login.errors.length > 0) {
            request.flash("errors", login.errors);
            request.session.save(function () {
                return response.redirect("/login");
            });
            return;
        }

        request.session.user = login.user;

        request.session.save(function () {
            return response.render("admin", {
                title: "Interface | Admin",
            });
        });
    } catch (e) {
        console.log(e);
        return response.render("404");
    }
};

exports.logout = (request, response) => {
    request.session.destroy()
    response.redirect('/login')
}