require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require("body-parser");
const router = require('./app/routes/router');
const notFoundPageController = require("./app/middlewares/notFoundPageMiddleware");
const app = express();
const port = process.env.PORT

app.use(express.static(path.join(__dirname, "app", "public")));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        sameSite: 'strict'
    }
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json({
    verify: (req, res, buf) => {
        req.rawBody = buf
    }
}))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "app", "views"));

app.use("/", router);

app.use(notFoundPageController.getNotFoundPage);

app.listen(port, () => {
    console.log(`Servidor aberto em http://localhost:${port}`);
})