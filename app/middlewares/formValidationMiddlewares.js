const prisma = require("../../server/database/prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

class FormValidation {
	constructor() {
		this.cadastroValidation = this.cadastroValidation.bind(this);
		this.loginValidation = this.loginValidation.bind(this);
		this.recuperarSenhaValidation = this.recuperarSenhaValidation.bind(this);
        this.faleConoscoValidation = this.faleConoscoValidation.bind(this);
	}

	cadastroValidation(req, res, next) {
		const errors = validationResult(req);
		const { senha, confirmacao_senha } = req.body;

		this.#confirmacaoSenhaValidation(confirmacao_senha, senha, errors);

		if (!errors.isEmpty()) {
			const { nome, email, data_nascimento } = req.body;

			const nome_error = errors.errors.find((error) => error.path === "nome");
			const email_error = errors.errors.find((error) => error.path === "email");
			const data_nascimento_error = errors.errors.find((error) => error.path === "data_nascimento");
			const senha_error = errors.errors.find((error) => error.path === "senha");
			const confirmacao_senha_error = errors.errors.find((error) => error.path === "confirmacao_senha");

			return res.render("pages/cadastro.ejs", {
				data: {
					page_name: "Cadastro",
					input_values: {
						nome,
						email,
						data_nascimento,
						senha,
						confirmacao_senha,
					},
					errors: {
						nome_error,
						email_error,
						data_nascimento_error,
						senha_error,
						confirmacao_senha_error,
					},
				},
			});
		}

		return next();
	}

	async loginValidation(req, res, next) {
		const { email, senha } = req.body;

		const user = await this.#getUser(email);

		if (!user) {
			return res.render("pages/login.ejs", {
				data: {
					input_values: {
						email,
						senha,
					},
					errors: {
						email_error: {
							msg: "Usuário não encontrado",
						},
					},
				},
			});
		}

		bcrypt
			.compare(senha, user.senha)
			.then((auth) => {
				if (auth) {
					const token = jwt.sign({ userId: user.id }, process.env.SECRET);

					req.session.token = token;

					const premium = user.premium;

					req.session.premium = premium;

					return next();
				}

				return res.render("pages/login.ejs", {
					data: {
						input_values: {
							email,
							senha,
						},
						errors: {
							senha_error: {
								msg: "Senha incorreta",
							},
						},
					},
				});
			})
			.catch((erro) => {
				console.log(erro);
				return res.render("pages/login.ejs", {
					data: {
						input_values: {
							email,
							senha,
						},
						errors: {
							sistema_error: {
								msg: "Erro de sistema, tente novamente mais tarde!",
							},
						},
					},
				});
			});
	}

	async faleConoscoValidation(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
            const {
                email,
                duvida
            } = req.body;

			const token = req.session.token;

            const email_error = errors.errors.find((error) => error.path === "email");
			const duvida_error = errors.errors.find((error) => error.path === "duvida");

            const userLogged = this.#verifyLogin(token);

			return res.render("pages/fale-conosco.ejs", {
                data: {
                    page_name: "Fale conosco",
                    user_logged: userLogged,
                    email_sended: false,
                    input_values: {
                        email,
                        duvida
                    },
                    errors: {
                        email_error,
                        duvida_error
                    }
                }
            });
		}

		return next();
	}

	recuperarSenhaValidation(req, res, next) {
		const errors = validationResult(req);
		const { senha, confirmacao_senha } = req.body;
		const token = req.params.token;

		this.#confirmacaoSenhaValidation(confirmacao_senha, senha, errors);

		if (!errors.isEmpty()) {
			const senha_error = errors.errors.find((error) => error.path === "senha");
			const confirmacao_senha_error = errors.errors.find((error) => error.path === "confirmacao_senha");

			return res.render("pages/redefinir-senha.ejs", {
				data: {
					page_name: "Redefinir senha",
					token_validation: "valid_token",
					token,
					input_values: {
						senha,
						confirmacao_senha,
					},
					errors: {
						senha_error,
						confirmacao_senha_error,
					},
				},
			});
		}

		return next();
	}

	async #getUser(email) {
		const user = await prisma.usuario.findUnique({
			where: {
				email,
			},
		});

		return user;
	}

    #confirmacaoSenhaValidation(confirmacao_senha, senha, errors) {
		if (confirmacao_senha !== senha) {
			errors.errors.push({
				msg: "As senhas devem ser iguais!",
				path: "confirmacao_senha",
			});
		}
	}

    #verifyLogin(token) {
        if (!token) {
            return false;
        } else {
            try {
                jwt.verify(token, process.env.SECRET);

                return true;
            } catch (error) {
                return false;
            }
        }
    }
}

const FormValidationMiddleware = new FormValidation();

module.exports = FormValidationMiddleware;
