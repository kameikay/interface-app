require("dotenv").config();
const express = require("express");
const server = express();
const path = require("path");
const mongoose = require("mongoose");

mongoose
    .connect(process.env.CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    })
    .then(() => {
        server.emit("Database OK");
    })
    .catch((e) => console.log(e));

const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const routes = require("./routes/routes");
const adminRoutes = require("./routes/admin.routes");
const csrf = require("csurf");
const {
    checkCsrfError,
    csrfMiddleware,
    middlewareError,
} = require("./src/middlewares/middleware");

const sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION_STRING }),
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
    },
    saveUninitialized: true,
});

server.use(sessionOptions);
server.use(flash());


server.use(express.static(path.resolve(__dirname, "src", "public")));

server.set("views", path.resolve(__dirname, "src", "views", "pages"));
server.set("view engine", "ejs");

server.use(
    express.urlencoded({
        extended: true,
    })
);

server.use(express.json());

server.use(middlewareError);

server.use("/user", adminRoutes);

server.use(csrf());
server.use(checkCsrfError);
server.use(csrfMiddleware);

server.use("/", routes);

server.on("Database OK", () => {
    server.listen(process.env.SERVER_PORT, () => {
        console.log(`🔥 Server running at http://localhost:${process.env.SERVER_PORT}`);
    });
});
