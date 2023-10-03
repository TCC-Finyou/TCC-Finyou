const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usuarioModel = require("../models/Usuario");
const { validationResult } = require("express-validator");

class FormValidation {
	constructor() {
		this.cadastroValidation = this.cadastroValidation.bind(this);
		this.loginValidation = this.loginValidation.bind(this);
		this.recuperarSenhaValidation = this.recuperarSenhaValidation.bind(this);
		this.faleConoscoValidation = this.faleConoscoValidation.bind(this);
		this.metaCreateValidation = this.metaCreateValidation.bind(this);
        this.metaUpdateValidation = this.metaUpdateValidation.bind(this);
		this.tagCreateValidation = this.tagCreateValidation.bind(this);
        this.tagUpdateValidation = this.tagUpdateValidation.bind(this);
	}

	cadastroValidation(req, res, next) {
		const errors = validationResult(req);
		const { senha, confirmacao_senha, termos_condicoes } = req.body;

		this.#confirmacaoSenhaValidation(confirmacao_senha, senha, errors);
        this.#confirmacaoTermosCondicoes(termos_condicoes, errors);

		if (!errors.isEmpty()) {
			const { nome, email, data_nascimento } = req.body;

			const nome_error = errors.errors.find((error) => error.path === "nome");
			const email_error = errors.errors.find((error) => error.path === "email");
			const data_nascimento_error = errors.errors.find((error) => error.path === "data_nascimento");
			const senha_error = errors.errors.find((error) => error.path === "senha");
			const confirmacao_senha_error = errors.errors.find((error) => error.path === "confirmacao_senha");
            const termos_condicoes_error = errors.errors.find((error) => error.path === "termos_condicoes");

			return res.render("pages/cadastro.ejs", {
				data: {
					page_name: "Cadastro",
					input_values: {
						nome,
						email,
						data_nascimento,
						senha,
						confirmacao_senha,
                        termos_condicoes
					},
					errors: {
						nome_error,
						email_error,
						data_nascimento_error,
						senha_error,
						confirmacao_senha_error,
                        termos_condicoes_error
					},
				},
			});
		}

		return next();
	}

	async loginValidation(req, res, next) {
		const { email, senha } = req.body;

		const user = await usuarioModel.findUserByEmail(email);

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

					req.session.premium = user.premium;

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
			const { email, duvida } = req.body;

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
						duvida,
					},
					errors: {
						email_error,
						duvida_error,
					},
				},
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

	metaCreateValidation(req, res, next) {
		const errors = validationResult(req);
        const valor_destinado = Number(req.body.valor_destinado);
        const valor_meta = Number(req.body.valor_meta);

		this.#verifyValorMeta(valor_meta, valor_destinado, errors);

		if (!errors.isEmpty()) {
			const { nome_meta, periodo_deposito } = req.body;
			const premium = req.session.premium;

			const nome_meta_error = errors.errors.find((error) => error.path === "nome_meta");
			const valor_meta_error = errors.errors.find((error) => error.path === "valor_meta");
			const valor_destinado_error = errors.errors.find((error) => error.path === "valor_destinado");
			const periodo_deposito_error = errors.errors.find((error) => error.path === "periodo_deposito");
			let data_alcancar_meta;

			if (valor_meta > 0 && valor_destinado > 0 && periodo_deposito) {
				data_alcancar_meta = this.#savePreviewValue(valor_meta, valor_destinado, periodo_deposito);
			}

			return res.render("pages/criar-meta.ejs", {
				data: {
					page_name: "Criar meta",
					premium,
					input_values: {
						nome_meta,
						valor_meta,
						valor_destinado,
						periodo_deposito,
					},
					errors: {
						nome_meta_error,
						valor_meta_error,
						valor_destinado_error,
						periodo_deposito_error,
					},
					preview_values: {
						data_alcancar_meta,
					}
				},
			});
		}

		return next();
	}

    metaUpdateValidation(req, res, next) {
		const errors = validationResult(req);
        const valor_destinado = Number(req.body.valor_destinado);
        const valor_meta = Number(req.body.valor_meta);
        const { metaId } = req.params;

		this.#verifyValorMeta(valor_meta, valor_destinado, errors);

		if (!errors.isEmpty()) {
			const { nome_meta, periodo_deposito } = req.body;
			const premium = req.session.premium;

			const nome_meta_error = errors.errors.find((error) => error.path === "nome_meta");
			const valor_meta_error = errors.errors.find((error) => error.path === "valor_meta");
			const valor_destinado_error = errors.errors.find((error) => error.path === "valor_destinado");
			const periodo_deposito_error = errors.errors.find((error) => error.path === "periodo_deposito");
			let data_alcancar_meta;

			if (valor_meta > 0 && valor_destinado > 0 && periodo_deposito) {
				data_alcancar_meta = this.#savePreviewValue(valor_meta, valor_destinado, periodo_deposito);
			}

			return res.render("pages/editar-meta.ejs", {
				data: {
					page_name: `Editar meta: ${nome_meta}`,
					premium,
					input_values: {
                        id: metaId,
						nome_meta,
						valor_meta,
						valor_destinado,
						periodo_deposito,
					},
					errors: {
						nome_meta_error,
						valor_meta_error,
						valor_destinado_error,
						periodo_deposito_error,
					},
					preview_values: {
						data_alcancar_meta,
					}
				},
			});
		}

		return next();
	}

	tagCreateValidation(req, res, next) {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			const { nome_tag, cor_tag } = req.body;
			const premium = req.session.premium;

			const nome_tag_error = errors.errors.find((error) => error.path === "nome_tag");
			const cor_tag_error = errors.errors.find((error) => error.path === "cor_tag");

			return res.render("pages/criar-tag.ejs", {
				data: {
					page_name: "Criar tag",
					premium,
					input_values: {
						nome_tag,
						cor_tag,
					},
					errors: {
						nome_tag_error,
						cor_tag_error,
					},
				},
			});
		}

		return next();
	}

    tagUpdateValidation(req, res, next) {
		const errors = validationResult(req);
        const { tagId } = req.params;

		if (!errors.isEmpty()) {
			const { nome_tag, cor_tag } = req.body;
			const premium = req.session.premium;

			const nome_tag_error = errors.errors.find((error) => error.path === "nome_tag");
			const cor_tag_error = errors.errors.find((error) => error.path === "cor_tag");

			return res.render("pages/editar-tag.ejs", {
				data: {
					page_name: `Editar tag: ${nome_tag}`,
					premium,
					input_values: {
                        id: tagId,
						nome_tag,
						cor_tag,
					},
					errors: {
						nome_tag_error,
						cor_tag_error,
					},
				},
			});
		}

		return next();
	}

	#confirmacaoSenhaValidation(confirmacao_senha, senha, errors) {
		if (confirmacao_senha !== senha) {
			errors.errors.push({
				msg: "As senhas devem ser iguais!",
				path: "confirmacao_senha",
			});
		}
	}

    #confirmacaoTermosCondicoes(termos_condicoes, errors) {
        if (termos_condicoes !== "on") {
            errors.errors.push({
                msg: "Você deve aceitar os termos e condições para criar uma conta!",
                path: "termos_condicoes"
            })
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

	#verifyValorMeta(valor_meta, valor_destinado, errors) {
		if (valor_meta < valor_destinado) {
			errors.errors.push(
				{
					msg: "Não é possível destinar um valor maior que o valor total da meta!",
					path: "valor_meta",
				},
				{
					msg: "Não é possível destinar um valor maior que o valor total da meta!",
					path: "valor_destinado",
				}
			);
		}
	}

	#savePreviewValue(valor_meta, valor_destinado, periodo_deposito) {
		let tempoAlcancarMeta = Math.ceil(valor_meta / valor_destinado);

		switch (periodo_deposito) {
			case "Diariamente":
				{
					return tempoAlcancarMeta === 1 ? `${tempoAlcancarMeta} dia` : `${tempoAlcancarMeta} dias`;
				}

			case "Semanalmente":
				{
					return tempoAlcancarMeta === 1 ? `${tempoAlcancarMeta} semana` : `${tempoAlcancarMeta} semanas`;
				}

			case "Quinzenalmente":
				{
					return tempoAlcancarMeta === 1 ? `${tempoAlcancarMeta} quinzena` : `${tempoAlcancarMeta} quinzenas`;
				}

			case "Mensalmente":
				{
					return tempoAlcancarMeta === 1 ? `${tempoAlcancarMeta} mês` : `${tempoAlcancarMeta} meses`;
				}
		}
	}
}

const FormValidationMiddleware = new FormValidation();

module.exports = FormValidationMiddleware;
