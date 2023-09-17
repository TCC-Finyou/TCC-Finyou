const { PrismaClient } = require("@prisma/client");
const { createPrismaRedisCache } = require("prisma-redis-middleware");

const prisma = new PrismaClient();

const cacheMiddleware = createPrismaRedisCache({
    models: [
        { model: "Usuario", cacheTime: 180, cacheKey: "usuario" },
        { model: "Token", cacheTime: 180, cacheKey: "token" },
        { model: "Meta", cacheTime: 180, cacheKey: "meta" }
    ],
    storage: {
        type: "memory",
        options: {
            invalidation: true,
        }
    },
    cacheTime: 300,
    excludeMethods: ["aggregate", "aggregateRaw", "count", "findFirst", "findFirstOrThrow", "findRaw", "groupBy", "queryRaw", "runCommandRaw"],
    onError: (key) => {
        console.log("error", key);
    }
})

prisma.$use(cacheMiddleware);

module.exports = prisma;