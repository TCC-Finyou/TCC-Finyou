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

    async updateUserPremiumByCustomerId(customerId) {
        const userId = await prisma.usuario.findFirst({
            where: {
                customer_id: customerId
            },
            select: {
                id
            }
        })

        await prisma.usuario.update({
            where: {
                id: userId
            },
            data: {
                premium: 1
            }
        })

        return user;
    }
}

const usuarioModel = new Usuario();

module.exports = usuarioModel;