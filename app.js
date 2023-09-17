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

console.log("REDIS SENHA", process.env.REDISPASSWORD)
console.log("REDIS URL", process.env.REDIS_URL)

const redisClient = redis.createClient({
    url: process.env.REDIS_URL,
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

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor aberto em http://localhost:${port}`);
});