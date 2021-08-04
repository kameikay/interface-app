const LoginModel = require('../models/LoginModel');

// LoginModel.create({
//     login: 'interface-admin',
//     password: '@interface_admin'
// })

exports.loginForm = (request, response) => {
    response.render("login", {
        title: "Interface | Login",
    });
};

exports.login = (request, response) => {
    console.log(request.body);
};
