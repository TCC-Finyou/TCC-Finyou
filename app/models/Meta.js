const prisma = require("../../server/database/prismaClient");

class Meta {
    async getAllMetasFromUser(userId) {
        return await prisma.meta.findMany({
            where: {
                user_id: userId
            },
            select: {
                id: true,
                nome_meta: true,
                valor_meta: true,
                valor_destinado: true,
                periodo_deposito: true
            },
            orderBy: {
                created_at: "desc"
            }
        });
    }

    async createMeta(data) {
        return await prisma.meta.create({
            data
        });
    }

    async updateMeta(metaId, data) {
        await prisma.meta.update({
            where: {
                id: metaId,
            },
            data
        })
    }
}

const metaModel = new Meta();

module.exports = metaModel;