const metaModel = require("../../../models/Meta");
const historicoMetaModel = require("../../../models/HistoricoMeta");
const { Queue, Worker } = require("bullmq");
const jwt = require("jsonwebtoken");

class EditarMetaController {
	constructor() {
		this.updateMeta = this.updateMeta.bind(this);
		this.queue = new Queue("meta", {
			connection: {
                host: process.env.REDISHOST,
                port: process.env.REDISPORT,
				password: process.env.REDISPASSWORD,
			},
		});
	}

	async updateMeta(req, res) {
        const token = req.session.token;
        const {userId, userType} = jwt.decode(token, process.env.SECRET);

        const { metaId } = req.params;
        const meta = await metaModel.getMetaById(metaId);

        if (userId !== meta.user_id && userType !== "admin") {
            return res.redirect("/perfil");
        }

		const { nome_meta, periodo_deposito } = req.body;
		const valor_meta = Number(req.body.valor_meta);
		const valor_destinado = Number(req.body.valor_destinado);

		try {
            const meta = await metaModel.updateMeta(metaId, {
				nome_meta,
				valor_meta,
				valor_destinado,
				periodo_deposito,
			})

            await this.#removePreviousScheduleHistoricoUpdate(meta.id);

			await this.#createMetaHistorico({
				meta_id: meta.id,
				valor_depositado: meta.valor_destinado,
			});

            if (userType === "admin") {
                return res.redirect("/metas-admin");
            }

			return res.redirect("/metas");
		} catch (error) {
			console.log(error);

			const premium = req.session.premium;
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
						valor_meta,
						valor_destinado,
						periodo_deposito,
					},
					errors: {
						sistema_error: {
							msg: "Erro de sistema, tente novamente mais tarde!",
						},
					},
                    preview_values: {
						data_alcancar_meta,
					}
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

	async #createMetaHistorico(data) {
		await historicoMetaModel.createHistoricoMeta(data);
	}

    async #removePreviousScheduleHistoricoUpdate(jobId) {
        await this.queue.removeRepeatableByKey(jobId);
    }
}

const editarMetaControllerUpdate = new EditarMetaController();

module.exports = editarMetaControllerUpdate;