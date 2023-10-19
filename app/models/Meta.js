const prisma = require("../../server/database/prismaClient");

class Meta {
    async getMetaById(metaId) {
        return await prisma.meta.findUnique({
            where: {
                id: metaId
            }
        });
    }

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
                periodo_deposito: true,
                historico_meta: true
            },
            orderBy: {
                created_at: "desc",
            }
        });
    }

    async createMeta(data) {
        return await prisma.meta.create({
            data
        });
    }

    async deleteMeta(metaId) {
        await prisma.meta.delete({
            where: {
                id: metaId
            }
        });
    }

    async updateMeta(metaId, data) {
        return await prisma.meta.update({
            where: {
                id: metaId,
            },
            data
        })
    }
}

const metaModel = new Meta();

module.exports = metaModel;