const usuarioModel = require("../../../models/Usuario");

class CadastroController {
	constructor() {
		this.createUser = this.createUser.bind(this);
	}

	async createUser(req, res) {
		const { nome, email, data_nascimento, senha, confirmacao_senha, termos_condicoes } = req.body;
        let termos_condicoes_banco_dados;

        if (termos_condicoes === "on") {
            termos_condicoes_banco_dados = 1;
        }

		const senhaCriptografada = req.encryptedPassword;
		const data_nascimento_formated = this.#formatDataNascimento(data_nascimento);

		try {
			await usuarioModel.createUser({
				nome,
				email,
				data_nascimento: data_nascimento_formated,
				senha: senhaCriptografada,
                termos_condicoes: termos_condicoes_banco_dados
			});

			return res.redirect("/login");
		} catch (erro) {
			console.log(erro);

			if (erro.code === "P2002") {
				return res.render("pages/cadastro.ejs", {
					data: {
						page_name: "Cadastro",
						input_values: {
							nome,
							email,
							data_nascimento,
							senha,
							confirmacao_senha,
							termos_condicoes,
						},
						errors: {
							email_error: {
								msg: "Email já cadastrado!",
							},
						},
					},
				});
			}

			return res.render("pages/cadastro.ejs", {
				data: {
					page_name: "Cadastro",
					input_values: {
						nome,
						email,
						data_nascimento,
						senha,
						confirmacao_senha,
						termos_condicoes,
					},
					errors: {
						sistema_error: {
							msg: "Erro de sistema, tente novamente mais tarde!",
						},
					},
				},
			});
		}
	}

	#formatDataNascimento(dataNascimento) {
		const dataNascimentoArray = dataNascimento.split("/");
		const dataNascimentoFormated = new Date(`${dataNascimentoArray[2]}/${dataNascimentoArray[1]}/${dataNascimentoArray[0]}`);

		return dataNascimentoFormated;
	}
}

const CadastroControllerCreate = new CadastroController();

module.exports = CadastroControllerCreate;
