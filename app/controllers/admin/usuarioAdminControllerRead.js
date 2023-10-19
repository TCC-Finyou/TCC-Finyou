const usuarioModel = require("../../models/Usuario");
const jwt = require("jsonwebtoken");

class usuarioAdminController {
    async getPage(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);
        const admin = await usuarioModel.findUserById(userId);

        const userIdParam = req.params.userId;
        const user = await usuarioModel.findUserById(userIdParam);

        return res.render("pages/admin/usuario-admin.ejs", {
            data: {
                page_name: "Finyou",
                user: admin,
                user_selected: user
            }
        })
    }
}

const usuarioAdminControllerRead = new usuarioAdminController();

module.exports = usuarioAdminControllerRead;