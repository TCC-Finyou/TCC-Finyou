const prisma = require("../../server/database/prismaClient");

class Transacao {
    async createTransacao(data) {
        return await prisma.transacao.create({
            data
        })
    }

    async getSomeTransacoesFromUser(userId) {
        return await prisma.transacao.findMany({
            where: {
                user_id: userId
            },
            orderBy: {
                created_at: "desc"
            },
            take: 4
        })
    }

    async getAllTransacoesFromUser(userId) {
        return await prisma.transacao.findMany({
            where: {
                user_id: userId
            },
            orderBy: {
                created_at: "desc"
            }
        })
    }

    async deleteTransacao(transacaoId) {
        return await prisma.transacao.delete({
            where: {
                id: transacaoId
            }
        })
    }
}

const transacaoModel = new Transacao();

module.exports = transacaoModel;