const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

class Authentication {
    async encryptPassword(req, res, next) {
        const {
            nome,
            email,
            data_nascimento,
            senha
        } = req.body;
        const salt = Number(process.env.SALT_ROUNDS);

        try {
            const hash = await bcrypt.hash(senha, salt);

            req.encryptedPassword = hash;

            return next();
        } catch (erro) {
            console.log(erro);
            return res.render("pages/cadastro", {
                data: {
                    page_name: "Cadastro",
                    input_values: {
                        nome,
                        email,
                        data_nascimento,
                        senha
                    },
                    errors: {
                        sistema_error: {
                            msg: "Erro de sistema, tente novamente mais tarde!"
                        }
                    }
                }
            });
        }
    }

    validateJWT(req, res, next) {
        const token = req.session.token;

        if (!token) {
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

    verifyPremium(req, res, next) {
        const premium = req.session.premium;

        if (!premium) {
            return res.redirect("/perfil");
        }

        return next();
    }
}

const AuthenticationMiddleware = new Authentication();

module.exports = AuthenticationMiddleware;