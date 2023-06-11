const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const prisma = require("../../server/database/prismaClient");

class Authentication {
    async encryptPassword(req, res, next) {
        const password = req.body.senha;
        const salt = Number(process.env.SALT_ROUNDS);

        try {
            const hash = await bcrypt.hash(password, salt);

            req.encryptedPassword = hash;

            return next();
        } catch (erro) {
            res.redirect("/cadastro");

            console.log(erro);
            throw erro;
        }
    }

    async authorizeLogin(req, res, next) {
        const {
            email,
            senha
        } = req.body;

        const user = await prisma.usuario.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            console.log("Usuário não cadastrado");
            return res.render("pages/login.ejs");
        }

        bcrypt.compare(senha, user.senha).then(auth => {
            if (auth) {
                const token = jwt.sign({ userId: user.email }, process.env.SECRET);

                req.session.token = token;

                return next();
            }

            return res.render("pages/login.ejs");
        })
        .catch(erro => {
            console.log(erro);
            return res.render("pages/login.ejs");
        })
    }

    validateJWT(req, res, next) {
        const token = req.session.token

        if (!token) {
            console.log("Token não identificado");
            return res.redirect("/login");
        }

        try {
            const verifiedToken = jwt.verify(token, process.env.SECRET);
            req.userEmail = verifiedToken.userId;

            return next();
        } catch (erro) {
            return res.redirect("/login");
        }
    }
}

const AuthenticationMiddleware = new Authentication();

module.exports = AuthenticationMiddleware;