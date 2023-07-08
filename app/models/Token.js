const prisma = require("../../server/database/prismaClient");

class Token {
    async findTokenById(tokenId) {
        const token = await prisma.token.findUnique({
            where: {
                id: tokenId
            }
        })

        return token;
    }

    async createToken(token_email) {
        const token = await prisma.token.create({
            data: {
                user_email: token_email
            }
        });

        return token;
    }
}

const tokenModel = new Token();

module.exports = tokenModel;