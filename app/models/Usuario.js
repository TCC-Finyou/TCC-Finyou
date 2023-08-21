const prisma = require("../../server/database/prismaClient");

class Usuario {
    async findUserById(userId) {
        const user = await prisma.usuario.findUnique({
            where: {
                id: userId
            }
        });

        return user;
    }

    async findUserByEmail(userEmail) {
        const user = await prisma.usuario.findUnique({
            where: {
                email: userEmail
            }
        })

        return user;
    }

    async createUser(data) {
        await prisma.usuario.create({
            data
        })
    }

    async updateUserPassword(userEmail, userNewPassword) {
        await prisma.usuario.update({
            where: {
                email: userEmail
            },
            data: {
                senha: userNewPassword
            }
        });
    }

    async uppdateUserCustomerId(userId, customerId) {
        await prisma.usuario.update({
            where: {
                id: userId
            },
            data: {
                customer_id: customerId
            }
        })
    }

    async addUserPremiumByCustomerId(customerId) {
        await prisma.usuario.update({
            where: {
                customer_id: customerId
            },
            data: {
                premium: 1
            }
        })
    }

    async removeUserPremiumByCustomerId(customerId) {
        await prisma.usuario.update({
            where: {
                customer_id: customerId
            },
            data: {
                premium: 0
            }
        })
    }
}

const usuarioModel = new Usuario();

module.exports = usuarioModel;