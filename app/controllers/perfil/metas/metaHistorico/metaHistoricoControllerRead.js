const historicoMetaModel = require("../../../../models/HistoricoMeta");

class MetaHistoricoController {
	async getPage(req, res) {
        const premium = req.session.premium;
        const { metaId } = req.params;

		try {
			const historicoMeta = await historicoMetaModel.getAllHistoricoFromMeta(metaId);

			if (historicoMeta.length === 0) {
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

            const historicoMetasPeriodoCumprido = await historicoMetaModel.getValorTotalHistoricoMeta(metaId);

            let totalAcumuladoMeta = 0;

            historicoMetasPeriodoCumprido.forEach(periodoCumprido => {
                totalAcumuladoMeta += periodoCumprido.valor_depositado;
            })

			return res.render("pages/meta-historico.ejs", {
				data: {
					page_name: `Histórico da meta: ${historicoMeta[0].meta.nome_meta}`,
					premium,
					historicoMeta,
                    totalAcumuladoMeta
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
