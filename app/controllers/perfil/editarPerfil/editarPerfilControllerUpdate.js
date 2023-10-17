const usuarioModel = require("../../../models/Usuario");
const jwt = require("jsonwebtoken");

class EditarPerfilController {
	constructor() {
		this.editUser = this.editUser.bind(this);
	}

	async editUser(req, res) {
        const token = req.session.token;
        const {userId, userType} = jwt.decode(token, process.env.SECRET);
        const user = await usuarioModel.findUserById(userId);

        if (userId !== user.id && userType !== "admin") {
            return res.redirect("/perfil");
        }

		const { nome, email, data_nascimento } = req.body;

		const data_nascimento_formated = this.#formatDataNascimento(data_nascimento);
        const data_nascimento_unix = Math.floor(data_nascimento_formated.getTime() / 1000);

		try {
			await usuarioModel.updatePerfil({
				nome,
				email,
				data_nascimento: data_nascimento_unix
			}, userId);

			return res.redirect("/perfil");
		} catch (erro) {
			console.log(erro);

			if (erro.code === "P2002") {
				return res.render("pages/editar-perfil.ejs", {
					data: {
						page_name: "Editar perfil",
						input_values: {
							nome,
							email,
							data_nascimento
						},
						errors: {
							email_error: {
								msg: "Email já cadastrado!",
							},
						},
					},
				});
			}

			return res.render("pages/editar-perfil.ejs", {
				data: {
					page_name: "Editar perfil",
					input_values: {
						nome,
						email,
						data_nascimento,
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

const EditarPerfilControllerCreate = new EditarPerfilController();

module.exports = EditarPerfilControllerCreate;
