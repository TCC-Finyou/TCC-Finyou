const redis = require("redis");
const RedisStore = require("connect-redis").default;

console.log(process.env.REDIS_URL, "-----------------------------", process.env.REDISPASSWORD, "-----------------------------", process.env.REDISHOST, "-----------------------------", process.env.REDISPORT)

const redisClient = redis.createClient({
	url: process.env.REDIS_URL,
	password: process.env.REDISPASSWORD,
    socket: {
        host: process.env.REDISHOST,
        port: process.env.REDISPORT
    }
});
redisClient.connect();

redisClient.on("error", function (err) {
	console.log("Erro ao conectar com o Redis: " + err);
});

redisClient.on("connect", function (err) {
	console.log("Conectado com sucesso ao Redis");
});

const redisStore = new RedisStore({
	client: redisClient,
	prefix: "myapp:",
	ttl: 60 * 60 * 3,
});

module.exports = {redisStore, redisClient};