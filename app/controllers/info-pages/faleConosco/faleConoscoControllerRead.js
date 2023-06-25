const jwt = require("jsonwebtoken");
const prisma = require("../../../../server/database/prismaClient");

class FaleConoscoController {
    constructor() {
        this.getPage = this.getPage.bind(this);
    }

    async getPage(req, res) {
        const token = req.session.token;

        if (!token) {
            return res.render("pages/fale-conosco.ejs", {
                data: {
                    page_name: "Fale conosco",
                    user_logged: false
                }
            })
        }

        try {
            jwt.verify(token, process.env.SECRET);

            const {userId} = jwt.decode(token);

            const userEmail = await this.#getUserEmail(userId);

            return res.render("pages/fale-conosco.ejs", {
                data: {
                    page_name: "Fale conosco",
                    user_logged: true,
                    userEmail
                }
            })
        } catch (erro) {
            console.log(erro);
            return res.render("pages/fale-conosco.ejs", {
                data: {
                    page_name: "Fale conosco",
                    user_logged: false
                }
            })
        }
    }

    async #getUserEmail(userId) {
        const user = await prisma.usuario.findUnique({
            where: {
                id: userId
            }
        });

        return user.email;
    }
}

const FaleConoscoControllerRead = new FaleConoscoController();

module.exports = FaleConoscoControllerRead;