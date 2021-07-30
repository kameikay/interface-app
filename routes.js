const express = require("express");
const route = express.Router();

const homeController = require("./src/controllers/homeController");
const simuladorController = require('./src/controllers/simuladorController')
const portfolioController = require('./src/controllers/portfolioController')

// Home
route.get("/", homeController.homePage);


route.get("/simulacao", simuladorController.simuladorPage);


route.get("/portfolio", portfolioController.portfolioPage);


module.exports = route;
