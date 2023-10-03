const historicoMetaModel = require("../../../../models/HistoricoMeta");

class MetaHistoricoController {
	async getPage(req, res) {
        const premium = req.session.premium;

		try {
			const historicoMeta = await historicoMetaModel.getAllHistoricoFromMeta(req.params.metaId);

			if (!historicoMeta) {
                return res.render("pages/meta-historico.ejs", {
                    data: {
                        page_name: "Histórico de meta",
                        premium,
                        errors: {
                            historico_meta_error: {
                                msg: "Essa meta ainda não tem histórico ou não existe!"
                            }
                        }
                    }
                })
            }

			return res.render("pages/meta-historico.ejs", {
				data: {
					page_name: `Histórico da meta: ${historicoMeta[0].meta.nome_meta}`,
					premium,
					historicoMeta
				},
			});
		} catch (erro) {
			console.log(erro);

            return res.render("pages/meta-historico.ejs", {
                data: {
                    page_name: "Histórico de meta",
                    premium,
                    errors: {
                        historico_meta_error: {
                            msg: "Erro de sistema, tente novamente mais tarde!"
                        }
                    }
                }
            });
		}
	}
}

const metaHistoricoControllerRead = new MetaHistoricoController();

module.exports = metaHistoricoControllerRead;
