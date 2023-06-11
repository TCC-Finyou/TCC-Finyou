const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

class Authentication {
    async encryptPassword(req, res, next) {
        const password = req.body.senha;
        const salt = Number(process.env.SALT_ROUNDS);

        try {
            const hash = await bcrypt.hash(password, salt);

            req.encryptedPassword = hash;

            return next();
        } catch (erro) {
            res.render("pages/cadastro");

            console.log(erro);
            throw erro;
        }
    }

    validateJWT(req, res, next) {
        const token = req.session.token;

        if (!token) {
            console.log("Token não identificado");
            return res.redirect("/login");
        }

        try {
            jwt.verify(token, process.env.SECRET);

            return next();
        } catch (erro) {
            console.log(erro);
            return res.redirect("/login");
        }
    }
}

const AuthenticationMiddleware = new Authentication();

module.exports = AuthenticationMiddleware;