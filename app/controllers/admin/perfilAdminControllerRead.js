const usuarioModel = require("../../models/Usuario");
const jwt = require("jsonwebtoken");

class PerfilAdminController {
    async getPage(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);
        const user = await usuarioModel.findUserById(userId);
        const users = await usuarioModel.findAllUsers(userId);


        return res.render("pages/admin/perfil-admin.ejs", {
            data: {
                page_name: "Finyou",
                user,
                users
            }
        })
    }
}

const perfilAdminControllerRead = new PerfilAdminController();

module.exports = perfilAdminControllerRead;