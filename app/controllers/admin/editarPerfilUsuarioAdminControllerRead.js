const usuarioModel = require("../../models/Usuario");
const jwt = require("jsonwebtoken");

class EditarUsuarioAdminController {
    async getPage(req, res) {
        const token = req.session.token;
        const userIdAdmin = jwt.decode(token, process.env.SECRET);

        const userId = req.params.userId;

        const admin = await usuarioModel.findUserById(userIdAdmin.userId);
        const user = await usuarioModel.findUserById(userId);

        const dataNascimentoValida = new Date(user.data_nascimento * 1000);

        const dataNascimentoFormatada = `${dataNascimentoValida.getDate()}/${String(dataNascimentoValida.getMonth() + 1).padStart(2, "0")}/${dataNascimentoValida.getFullYear()}`

        return res.render("pages/admin/editar-perfil-usuario.ejs", {
            data: {
                page_name: "Finyou",
                userId,
                user: admin,
                input_values: {
                    nome: user.nome,
                    email: user.email,
                    data_nascimento: dataNascimentoFormatada,
                    cargo: user.cargo
                }
            }
        })
    }
}

const editarUsuarioAdminControllerRead = new EditarUsuarioAdminController();

module.exports = editarUsuarioAdminControllerRead;