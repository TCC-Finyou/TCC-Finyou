const prisma = require("../../server/database/prismaClient");

class RecoverPassword {
    async validateLink(req, res, next) {
        const token = req.params.token;

        const tokenDatabase = await prisma.token.findUnique({
            where: {
                id: token
            }
        })

        if (!tokenDatabase) {
            return res.render("pages/redefinir-senha.ejs", {
                data: {
                    page_name: "Redefinir senha",
                    token_validation: "invalid_token"
                }
            })
        }

        const tokenCreationTime = new Date(tokenDatabase.created_at).getTime();
        const actualTime = new Date().getTime();
        const timePassed = (actualTime - tokenCreationTime) / 1000 / 60;

        if (timePassed > 15) {
            return res.render("pages/redefinir-senha.ejs", {
                data: {
                    page_name: "Redefinir senha",
                    token_validation: "expired_token"
                }
            })
        }

        return next();
    }
}

const RecoverPasswordMiddleware = new RecoverPassword();

module.exports = RecoverPasswordMiddleware;