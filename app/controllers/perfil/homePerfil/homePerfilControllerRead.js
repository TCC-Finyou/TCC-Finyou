const usuarioModel = require("../../../models/Usuario");
const transacaoModel = require("../../../models/Transacao");
const jwt = require("jsonwebtoken");

class HomePerfilController {
    async getPage(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);
        const user = await usuarioModel.findUserById(userId);

        const premium = req.session.premium;

        const transacoes = await transacaoModel.getSomeTransacoesFromUser(userId);

        return res.render("pages/perfil.ejs", {
            data: {
                page_name: "Perfil",
                premium,
                user,
                transacoes
            }
        })
    }
}

const HomePerfilControllerRead = new HomePerfilController();

module.exports = HomePerfilControllerRead;