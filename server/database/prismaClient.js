const { PrismaClient } = require("@prisma/client");
const { createPrismaRedisCache } = require("prisma-redis-middleware");
const { redisClient } = require("./redis");

const prisma = new PrismaClient();

const cacheMiddleware = createPrismaRedisCache({
    models: [
        { model: "Usuario", cacheKey: "usuario" },
        { model: "Meta", cacheKey: "meta" }
    ],
    storage: {
        type: "redis",
        options: {
            client: redisClient,
            invalidation: true,
        }
    },
    excludeModels: ["Token"],
    excludeMethods: ["aggregate", "aggregateRaw", "count", "findFirst", "findFirstOrThrow", "findRaw", "groupBy", "queryRaw", "runCommandRaw"],
    onError: (key) => {
        console.log("error", key);
    }
})

prisma.$use(cacheMiddleware);

module.exports = prisma;