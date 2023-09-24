const prisma = require("../../server/database/prismaClient");

class HistoricoMeta {
    async getAllHistoricoFromMeta(metaId) {
        return await prisma.historico_Meta.findMany({
            where: {
                meta_id: metaId
            },
            include: {
                meta: {
                    select: {
                        nome_meta: true
                    }
                }
            }
        });
    }

    async createHistoricoMeta(data) {
        return await prisma.historico_Meta.create({
            data
        })
    }

    async updateHistoricoMeta(historicoMetaId, data) {
        await prisma.historico_Meta.update({
            where: {
                id: historicoMetaId
            },
            data
        })
    }
}

const historicoMetaModel = new HistoricoMeta();

module.exports = historicoMetaModel;