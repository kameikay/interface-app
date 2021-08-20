const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const Portfolio = require("../models/PortfolioModel");

exports.homePage = async (request, response) => {
    try {
        const portfolio = await Portfolio.showAll();

        response.render("index", {
            title: "Interface | Soluções Sustentáveis",
            portfolio,
        });
    } catch (error) {
        console.log(error);
        response.render("404", {
            title: "Interface | Página não encontrada",
        });
    }
};

exports.sendEmail = async (request, response) => {
    try {
        const { name, email, message } = request.body;

        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.GMAIL_USER,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER,
            replyTo: email,
            subject: `Mensagem do site - Orçamento para ${name} `,
            text: message,
        };

        const result = await transport.sendMail(mailOptions);

        if (result) {
            return response.render("thanks", {
                title: "Interface | E-mail enviado",
            });
        }

        return;
    } catch (error) {
        console.log(error);
        response.render("404", {
            title: "Interface | Página não encontrada",
        });
    }
};
