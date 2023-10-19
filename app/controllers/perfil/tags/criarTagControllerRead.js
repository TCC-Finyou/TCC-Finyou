const usuarioModel = require("../../../models/Usuario");
const jwt = require("jsonwebtoken");

class CriarTagController {
    async getPage(req, res) {
        const token = req.session.token;
        const {userType, userId} = jwt.decode(token, process.env.SECRET);
        let user = null;

        if (userType === "admin") {
            user = await usuarioModel.findUserById(userId);
        }

        const premium = req.session.premium;

        return res.render("pages/criar-tag.ejs", {
            data: {
                page_name: "Criar tag",
                premium,
                userType,
                user
            }
        });
    }
}

const criarTagControllerRead = new CriarTagController();

module.exports = criarTagControllerRead;