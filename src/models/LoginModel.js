const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
    constructor(body) {
        this.body = body
    }
}


module.exports = LoginModel;
