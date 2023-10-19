const usuarioModel = require("../../models/Usuario");
const metaModel = require("../../models/Meta");
const jwt = require("jsonwebtoken");

class metasAdminController {
    async getPage(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);
        const user = await usuarioModel.findUserById(userId);

        const userIdParam = req.params.userId;
        const metas = await metaModel.getAllMetasFromUser(userIdParam);

        return res.render("pages/admin/metas-admin.ejs", {
            data: {
                page_name: "Finyou",
                user,
                metas
            }
        })
    }
}

const metasAdminControllerRead = new metasAdminController();

module.exports = metasAdminControllerRead;