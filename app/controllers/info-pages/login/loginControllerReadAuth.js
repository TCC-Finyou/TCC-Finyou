const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const prisma = require("../../../../server/database/prismaClient");

class LoginController {
    constructor() {
        this.authUser = this.authUser.bind(this);
    }

    async authUser(req, res) {
        const {
            email,
            senha
        } = req.body;

        const user = await this.#getUser(email);

        if (!user) {
            console.log("Usuário não cadastrado");
            return res.render("pages/login.ejs");
        }

        bcrypt.compare(senha, user.senha).then(auth => {
            if (auth) {
                const token = jwt.sign({ userId: user.id }, process.env.SECRET);

                req.session.token = token;

                return res.redirect("/perfil");
            }

            console.log("Senha errada");
            return res.render("pages/login.ejs");
        })
        .catch(erro => {
            console.log(erro);
            return res.render("pages/login.ejs");
        })
    }

    async #getUser(email) {
        const user = await prisma.usuario.findUnique({
            where: {
                email
            }
        })

        return user;
    }
}

const LoginControllerReadAuth = new LoginController();

module.exports = LoginControllerReadAuth;