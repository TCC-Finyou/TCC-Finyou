const usuarioModel = require("../../models/Usuario");
const jwt = require("jsonwebtoken");

class editarPerfilAdminController {
    async getPage(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);

        const user = await usuarioModel.findUserById(userId);

        const dataNascimentoValida = new Date(user.data_nascimento * 1000);

        const dataNascimentoFormatada = `${dataNascimentoValida.getDate()}/${String(dataNascimentoValida.getMonth() + 1).padStart(2, "0")}/${dataNascimentoValida.getFullYear()}`

        return res.render("pages/admin/editar-perfil-admin.ejs", {
            data: {
                page_name: "Finyou",
                input_values: {
                    nome: user.nome,
                    email: user.email,
                    data_nascimento: dataNascimentoFormatada
                },
                user,
                userId
            }
        })
    }
}

const editarPerfilAdminControllerRead = new editarPerfilAdminController();

module.exports = editarPerfilAdminControllerRead;