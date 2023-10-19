const usuarioModel = require("../../models/Usuario");
const jwt = require("jsonwebtoken");

class relatoriosAdminController {
    async getPage(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);
        const user = await usuarioModel.findUserById(userId);

        return res.render("pages/admin/relatorio-admin.ejs", {
            data: {
                page_name: "Finyou",
                user
            }
        })
    }
}

const relatoriosAdminControllerRead = new relatoriosAdminController();

module.exports = relatoriosAdminControllerRead;