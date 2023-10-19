const transacaoModel = require("../../../models/Transacao");
const jwt = require("jsonwebtoken");

class ExtratoController {
    async getPage(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);

        const premium = req.session.premium;

        const transacoes = await transacaoModel.getAllTransacoesFromUser(userId);

        console.log(transacoes)

        return res.render("pages/extrato.ejs", {
            data: {
                page_name: "Extrato",
                premium,
                transacoes
            }
        })
    }
}

const extratoControllerRead = new ExtratoController();

module.exports = extratoControllerRead;