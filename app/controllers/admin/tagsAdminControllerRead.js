const usuarioModel = require("../../models/Usuario");
const tagModel = require("../../models/Tag");
const jwt = require("jsonwebtoken");

class tagsAdminController {
    async getPage(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);
        const admin = await usuarioModel.findUserById(userId);

        const userIdParam = req.params.userId;
        const tags = await tagModel.getAllTagsFromUser(userIdParam);

        return res.render("pages/admin/tags-admin.ejs", {
            data: {
                page_name: "Finyou",
                user: admin,
                tags
            }
        })
    }
}

const tagsAdminControllerRead = new tagsAdminController();

module.exports = tagsAdminControllerRead;