const usuarioModel = require("../../models/Usuario");
const jwt = require("jsonwebtoken");

class EditarUsarioAdminController {
	constructor() {
		this.editUser = this.editUser.bind(this);
	}

	async editUser(req, res) {
        const token = req.session.token;
        const userIdAdmin = jwt.decode(token, process.env.SECRET);
        const userId = req.params.userId;

		const { nome, email, data_nascimento, cargo } = req.body;

		const data_nascimento_formated = this.#formatDataNascimento(data_nascimento);
        const data_nascimento_unix = Math.floor(data_nascimento_formated.getTime() / 1000);

		try {
			await usuarioModel.updatePerfil({
				nome,
				email,
				data_nascimento: data_nascimento_unix,
                cargo
			}, userId);

            return res.redirect("/perfil-admin");
		} catch (erro) {
			console.log(erro);

            const admin = await usuarioModel.findUserById(userIdAdmin.userId);

			if (erro.code === "P2002") {
				return res.render("pages/admin/editar-perfil-usuario.ejs", {
					data: {
						page_name: "Editar perfil",
                        user: admin,
						input_values: {
							nome,
							email,
							data_nascimento,
                            cargo
						},
						errors: {
							email_error: {
								msg: "Email já cadastrado!",
							},
						},
					},
				});
			}

			return res.render("pages/admin/editar-perfil-usuario.ejs", {
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

const EditarUsuarioAdminControllerUpdate = new EditarUsarioAdminController();

module.exports = EditarUsuarioAdminControllerUpdate;
