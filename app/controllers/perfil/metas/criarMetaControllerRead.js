const usuarioModel = require("../../../models/Usuario");
const jwt = require("jsonwebtoken");
class CriarMetaController {
    async getPage(req, res) {
        const token = req.session.token;
        const {userId, userType} = jwt.decode(token, process.env.SECRET);

        let user = null;

        if (userType === "admin") {
            user = await usuarioModel.findUserById(userId);
        }

        console.log(userType)

        const premium = req.session.premium;

        return res.render("pages/criar-meta.ejs", {
            data: {
                page_name: "Criar meta",
                premium,
                userType,
                user
            },
        });
    }
}

const CriarMetaControllerRead = new CriarMetaController();

module.exports = CriarMetaControllerRead;