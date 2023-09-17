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
        const metas = await prisma.meta.findMany({
            where: {
                user_id: userId
            },
            select: {
                id: true,
                nome_meta: true,
                valor_meta: true,
                valor_destinado: true,
                periodo_deposito: true
            }
        });

        return metas;
    }

    async getImageMeta(metaId) {
        const meta = await prisma.meta.findUnique({
            where: {
                id: metaId
            },
            select: {
                imagem_meta: true,
                tipo_imagem: true
            }
        })

        return meta;
    }

    async createMeta(data) {
        return await prisma.meta.create({
            data
        });
    }

    async updateMeta(userId, data) {
        await prisma.meta.update({
            where: {
                id: userId,
            },
            data
        })
    }
}

const metaModel = new Meta();

module.exports = metaModel;