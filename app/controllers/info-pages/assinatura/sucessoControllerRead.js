const userModel = require("../../../models/Usuario");
const jwt = require("jsonwebtoken");

class SucessoController {
    async getPage(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.secret);

        const user = await userModel.findUserById(userId);

        req.session.premium = user.premium;

        return res.render("pages/sucesso-assinatura.ejs", {
            data: {
                page_name: "Assinatura realizada"
            }
        });
    }
}

const SucessoControllerRead = new SucessoController();

module.exports = SucessoControllerRead;