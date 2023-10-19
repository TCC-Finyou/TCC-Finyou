const tagModel = require("../../../models/Tag");
const jwt = require("jsonwebtoken");

class AdicionarTransacaoController {
    async getPage(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);

        const premium = req.session.premium;

        const tags = await tagModel.getAllTagsFromUser(userId);

        return res.render("pages/adicionar-transacao.ejs", {
            data: {
                page_name: "Adicionar transação",
                premium,
                tags,
            }
        })
    }
}

const adicionarTransacaoControllerRead = new AdicionarTransacaoController();

module.exports = adicionarTransacaoControllerRead;