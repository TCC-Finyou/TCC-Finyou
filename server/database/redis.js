const redis = require("redis");
const RedisStore = require("connect-redis").default;

const redisClient = redis.createClient();
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