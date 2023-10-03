const metaModel = require("../../../models/Meta");

class EditarMetaController {
    constructor() {
        this.getPage = this.getPage.bind(this);
    }

	async getPage(req, res) {
		const premium = req.session.premium;
		const { metaId } = req.params;

		try {
			const { nome_meta, valor_destinado, valor_meta, periodo_deposito } = await metaModel.getMetaById(metaId);
            let data_alcancar_meta;

			if (valor_meta > 0 && valor_destinado > 0 && periodo_deposito) {
				data_alcancar_meta = this.#savePreviewValue(valor_meta, valor_destinado, periodo_deposito);
			}

			return res.render("pages/editar-meta.ejs", {
				data: {
					page_name: `Editar meta: ${nome_meta}`,
					premium,
					input_values: {
                        id: metaId,
						nome_meta,
						valor_destinado,
						valor_meta,
						periodo_deposito,
					},
					preview_values: {
						data_alcancar_meta,
					}
				},
			});
		} catch (erro) {
			console.log(erro);

			return res.render("pages/editar-meta.ejs", {
				data: {
					page_name: "Editar meta",
					premium,
                    input_values: {
                        id: metaId
					},
					errors: {
						editar_meta_error: {
							msg: "Erro de sistema, tente novamente mais tarde!",
						},
					},
				},
			});
		}
	}

	#savePreviewValue(valor_meta, valor_destinado, periodo_deposito) {
		let tempoAlcancarMeta = Math.ceil(valor_meta / valor_destinado);

		switch (periodo_deposito) {
			case "Diariamente": {
				return tempoAlcancarMeta === 1 ? `${tempoAlcancarMeta} dia` : `${tempoAlcancarMeta} dias`;
			}

			case "Semanalmente": {
				return tempoAlcancarMeta === 1 ? `${tempoAlcancarMeta} semana` : `${tempoAlcancarMeta} semanas`;
			}

			case "Quinzenalmente": {
				return tempoAlcancarMeta === 1 ? `${tempoAlcancarMeta} quinzena` : `${tempoAlcancarMeta} quinzenas`;
			}

			case "Mensalmente": {
				return tempoAlcancarMeta === 1 ? `${tempoAlcancarMeta} mês` : `${tempoAlcancarMeta} meses`;
			}
		}
	}
}

const editarMetaControllerRead = new EditarMetaController();

module.exports = editarMetaControllerRead;