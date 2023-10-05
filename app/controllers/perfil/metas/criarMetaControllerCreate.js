const metaModel = require("../../../models/Meta");
const historicoMetaModel = require("../../../models/HistoricoMeta");
const jwt = require("jsonwebtoken");
const { Queue, Worker } = require("bullmq");

class CriarMetaController {
	constructor() {
		this.createMeta = this.createMeta.bind(this);
		this.queue = new Queue("meta", {
			connection: {
				password: process.env.REDISPASSWORD,
			},
		});
	}

	async createMeta(req, res) {
		const token = req.session.token;
		const { userId } = jwt.decode(token, process.env.secret);

		const { nome_meta, periodo_deposito } = req.body;
		const valor_meta = Number(req.body.valor_meta);
		const valor_destinado = Number(req.body.valor_destinado);

		try {
			const meta = await metaModel.createMeta({
				user_id: userId,
				nome_meta,
				valor_meta,
				valor_destinado,
				periodo_deposito,
			});

			await this.#createMetaHistorico({
				meta_id: meta.id,
				valor_depositado: meta.valor_destinado,
			});

			await this.#scheduleHistoricoUpdate(meta);

			return res.redirect("/metas");
		} catch (error) {
			console.log(error);

			const premium = req.session.premium;
            let data_alcancar_meta;

			if (valor_meta > 0 && valor_destinado > 0 && periodo_deposito) {
				data_alcancar_meta = this.#savePreviewValue(valor_meta, valor_destinado, periodo_deposito);
			}

			return res.render("pages/criar-meta.ejs", {
				data: {
					page_name: "Criar meta",
					premium,
					input_values: {
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

	async #scheduleHistoricoUpdate(meta) {
		let periodoDeposito;

		switch (meta.periodo_deposito) {
			case "Diariamente":
				{
					periodoDeposito = "0 0 * * *"
				}
				break;

			case "Semanalmente":
				{
					periodoDeposito = "0 0 * * 1"
				}
				break;

			case "Quinzenalmente":
				{
					periodoDeposito = "0 0 1,16 * *"
				}
				break;

			case "Mensalmente":
				{
					periodoDeposito = "0 0 1 * *"
				}
				break;
		}

		await this.queue.add("metaJob", {}, { attempts: 3, backoff: { type: "exponential", delay: 10000 }, repeat: { pattern: periodoDeposito, tz: "America/Sao_Paulo" }, jobId: meta.id });

		new Worker(
			"meta",
			async () => {
				await this.#createMetaHistorico({
					meta_id: meta.id,
					valor_depositado: meta.valor_destinado,
				});
			},
			{ connection: { password: process.env.REDISPASSWORD } }
		);
	}
}

const CriarMetaControllerCreate = new CriarMetaController();

module.exports = CriarMetaControllerCreate;