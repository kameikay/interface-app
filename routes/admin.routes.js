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
adminRoutes.get("/create-post", loginRequired, adminController.createPost);
adminRoutes.post("/register", loginRequired, adminController.register);
adminRoutes.get("/admin/edit/:id", loginRequired, adminController.editPage);
adminRoutes.post("/admin/edit/:id", loginRequired, adminController.editPost);
adminRoutes.get("/admin/delete/:id", loginRequired, adminController.deletePost);

// adminRoutes.get("/api", api.index);
// adminRoutes.get("/api/:id", api.show);
// adminRoutes.post("/api", api.store);
// adminRoutes.put("/api/:id", api.update);
// adminRoutes.delete("/api/:id", api.delete);

adminRoutes.get("/*", errorController.errorPage);

module.exports = adminRoutes;
