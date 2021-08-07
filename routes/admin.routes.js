const express = require("express");
const adminRoutes = express.Router();

const api = require("../src/controllers/api");
const adminController = require("../src/controllers/adminController");
const loginController = require("../src/controllers/loginController");

const errorController = require("../src/controllers/errorController");

const { loginRequired } = require("../src/middlewares/middleware");

adminRoutes.get("/", loginController.loginForm);
adminRoutes.post("/", loginController.login);
adminRoutes.get("/logout", loginController.logout);

adminRoutes.get("/admin", loginRequired, adminController.adminPage);

// adminRoutes.get("/api", api.index);
// adminRoutes.get("/api/:id", api.show);
// adminRoutes.post("/api", api.store);
// adminRoutes.put("/api/:id", api.update);
// adminRoutes.delete("/api/:id", api.delete);

adminRoutes.get("*", errorController.errorPage);

module.exports = adminRoutes;
