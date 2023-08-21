require('dotenv').config();

const express = require('express');
const session = require('express-session');
const path = require('path');
const router = require('./app/routes/router');
const notFoundPageController = require('./app/middlewares/notFoundPageMiddleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        sameSite: 'strict'
    }
}));

// ! CRIAR UM MIDDLEWARE PARA FAZER O PARSE DO JSON, PORQUE NÃO ESTOU MAIS USANDO:
// ! app.use(express.json());

app.use(express.raw({ type: "application/json" }));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

app.use(express.static(path.join(__dirname, 'app', 'public')));

app.use('/', router);

app.use(notFoundPageController.getNotFoundPage);

app.listen(port, () => {
    console.log(`Servidor aberto em http://localhost:${port}`);
});