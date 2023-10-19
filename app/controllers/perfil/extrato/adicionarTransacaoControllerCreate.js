const transacaoModel = require("../../../models/Transacao");
const tagModel = require("../../../models/Tag");
const jwt = require("jsonwebtoken");

class AdicionarTransacaoController {
    async createTransacao(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);

        const premium = req.session.premium;

        const {tag, nome, valor, tipo_transacao, meio_transacao} = req.body;

        try {
            await transacaoModel.createTransacao({
                tag_id: tag,
                nome_transacao: nome,
                valor_transacao: Number(valor),
                tipo_transacao,
                meio_transacao,
                user_id: userId
            })

            return res.redirect("/extrato");
        } catch (erro) {
            console.log(erro);

            const tags = await tagModel.getAllTagsFromUser(userId);
            const tagDatabase = await tagModel.getTagById(tag);

            return res.render("pages/adicionar-transacao.ejs", {
                data: {
                    page_name: "Adicionar transação",
                    premium,
                    tags,
                    input_values: {
                        tag,
                        tag_name: tagDatabase.nome_tag,
                        nome,
                        valor,
                        tipo_transacao,
                        meio_transacao
                    },
                    errors: {
                        sistema_error: {
                            msg: "Erro de sistema tente novamente mais tarde!"
                        }
                    }
                }
            })
        }
    }
}

const adicionarTransacaoControllerCreate = new AdicionarTransacaoController();

module.exports = adicionarTransacaoControllerCreate;