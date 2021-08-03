const express = require("express");
const route = express.Router();

const homeController = require("./src/controllers/homeController");
const aboutController = require("./src/controllers/aboutController");
const simuladorController = require("./src/controllers/simuladorController");
const portfolioController = require("./src/controllers/portfolioController");
const loginController = require("./src/controllers/loginController");

route.get("/", homeController.homePage);
route.post("/", homeController.sendEmail);

route.get("/sobre", aboutController.aboutPage);

route.get("/simulacao", simuladorController.simuladorPage);

route.get("/portfolio", portfolioController.portfolioPage);

route.get("/login", loginController.loginForm);
route.post("/login", loginController.login);

module.exports = route;
