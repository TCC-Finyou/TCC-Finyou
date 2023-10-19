const usuarioModel = require("../../models/Usuario");
const jwt = require("jsonwebtoken");

class DeletarUsuarioAdminController {
	async deleteUser(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);

        const userIdParam = req.params.userId;

        if (userId === userIdParam) {
            return res.redirect("/perfil-admin");
        }

		try {
			await usuarioModel.deleteUser(userIdParam);

			return res.redirect("/perfil-admin");
		} catch (erro) {
			console.log(erro);

			return res.redirect("/perfil-admin");
		}
	}
}

const DeletarUsuarioAdminControllerDelete = new DeletarUsuarioAdminController();

module.exports = DeletarUsuarioAdminControllerDelete;
