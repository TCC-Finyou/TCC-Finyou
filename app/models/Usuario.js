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

    async findAllUsers(userId) {
        return await prisma.usuario.findMany({
            where: {
                NOT: {
                    id: userId
                }
            }
        });
    }

    async findAllUsersPesquisados(filtroPesquisa) {
        return await prisma.usuario.findMany({
            where: {
                OR: [
                    {
                        email: {
                            contains: filtroPesquisa
                        }
                    },
                    {
                        id: {
                            contains: filtroPesquisa
                        }
                    },
                    {
                        nome: {
                            contains: filtroPesquisa
                        }
                    }
                ]
            }
        })
    }

    async createUser(data) {
        return await prisma.usuario.create({
            data
        })
    }

    async deleteUser(userId) {
        return await prisma.usuario.delete({
            where: {
                id: userId,
            }
        })
    }

    async blockUser(userId) {
        return await prisma.usuario.update({
            where: {
                id: userId
            },
            data: {
                bloqueado: 1
            }
        })
    }

    async unblockUser(userId) {
        return await prisma.usuario.update({
            where: {
                id: userId
            },
            data: {
                bloqueado: 0
            }
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

    async updateUserCustomerId(userId, customerId) {
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

    async updatePerfil(data, userId){
        await prisma.usuario.update({
            where: {
                id: userId
            },
            data
        })
    }
}

const usuarioModel = new Usuario();

module.exports = usuarioModel;