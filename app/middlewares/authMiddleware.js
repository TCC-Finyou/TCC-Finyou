const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/Usuario");

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

    async encryptRecoveredPassword(req, res, next) {
        const {
            senha
        } = req.body;
        const salt = Number(process.env.SALT_ROUNDS);
        const token = req.params.token;

        try {
            const hash = await bcrypt.hash(senha, salt);

            req.encryptedPassword = hash;

            return next();
        } catch (erro) {
            console.log(erro);

            return res.render("pages/redefinir-senha.ejs", {
                data: {
                    page_name: "Redefinir senha",
                    token_validation: "valid_token",
                    token,
                    input_values: {
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

    async validateJWT(req, res, next) {
        const token = req.session.token;
        req.session.loginRedirectUrl = req.url;

        if (!token) {
            return res.redirect("/login");
        }

        const {userId} = jwt.decode(token, process.env.SECRET);

        const user = await usuarioModel.findUserById(userId);

        if (user.bloqueado) {
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

    validateAdmin(req, res, next) {
        const token = req.session.token;

        if (!token) {
            return res.redirect("/login");
        }

        const {userType} = jwt.decode(token, process.env.SECRET);

        if (userType !== "admin") {
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