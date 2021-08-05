require("dotenv").config();
const express = require("express");
const server = express();
const PORT = 3000;
const path = require("path");
const mongoose = require("mongoose");

mongoose
    .connect(process.env.CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => {
        server.emit("Database OK");
    })
    .catch((e) => console.log(e));

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const routes = require("./routes");
const csrf = require("csurf");
const {
    checkCsrfError,
    csrfMiddleware,
    middlewareError,
} = require("./src/middlewares/middleware");

const sessionOptions = session({
    secret: "1jh23@dj!k973pgnwb1%",
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    },
    saveUninitialized: true,
});


const { adminBroOptions, router } = require("./src/controllers/adminController");

server.use(adminBroOptions.options.rootPath, router);

server.use(sessionOptions);
server.use(flash());

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(express.static(path.resolve(__dirname, "src", "public")));

server.set("views", path.resolve(__dirname, "src", "views"));
server.set("view engine", "ejs");

server.use(csrf());
server.use(middlewareError);
server.use(checkCsrfError);
server.use(csrfMiddleware);
server.use(routes);

server.on("Database OK", () => {
    server.listen(PORT, () => {
        console.log(`🔥 Server running at http://localhost:${PORT}`);
    });
});
