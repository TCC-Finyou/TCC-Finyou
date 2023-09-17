require('dotenv').config();

const express = require('express');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis').default;

const path = require('path');
const router = require('./app/routes/router');
const notFoundPageController = require('./app/middlewares/notFoundPageMiddleware');

const app = express();
const port = process.env.PORT || 3000;
const portAddress = process.env.PORT_ADDRESS || '127.0.0.1';

const redisClient = redis.createClient({
    host: process.env.REDISHOST,
    port: process.env.REDISPORT,
    password: process.env.REDISPASSWORD
});
redisClient.connect();

redisClient.on('error', function (err) {
    console.log('Erro ao conectar com o Redis: ' + err);
});

redisClient.on('connect', function (err) {
    console.log('Conectado com sucesso ao Redis');
});

const redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:",
    ttl: 60 * 60 * 3,
  })

app.use(session({
    store: redisStore,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 3,
        httpOnly: true,
        sameSite: 'strict'
    }
}));

app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app', 'views'));

app.use(express.static(path.join(__dirname, 'app', 'public')));

app.use('/', router);

app.use(notFoundPageController.getNotFoundPage);

app.listen(`${portAddress}:${port}`, () => {
    console.log(`Servidor aberto em http://localhost:${port}`);
});