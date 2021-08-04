const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.body = {
            login: this.body.login,
            password: this.body.password,
        };

        if (this.errors.length > 0) return;
        this.user = await LoginModel.findOne({ login: this.body.login });

        if (!this.user ) {
            // || this.body.password !== this.user.password
            this.errors.push("Dados inválidos");
            this.user = null;
            return;
        }
    }

    // valida() {
    //     this.cleanUp()
    // }

    // cleanUp() {
    //     for (let key in this.body) {
    //         if (typeof this.body[key] !== 'string') {
    //             this.body[key] = ''
    //         }
    //     }

    // }
}

module.exports = Login;
