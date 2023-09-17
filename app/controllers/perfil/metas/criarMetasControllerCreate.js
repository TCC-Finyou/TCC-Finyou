const metaModel = require("../../../models/Meta");
const jwt = require("jsonwebtoken");

class CriarMetasController {
	constructor() {
		this.createMeta = this.createMeta.bind(this);
	}

	async createMeta(req, res) {
		const token = req.session.token;
		const { userId } = jwt.decode(token, process.env.secret);

		const { nome_meta, valor_meta, valor_destinado, periodo_deposito } = req.body;

		const imageBuffer = req.file.buffer;
		const imageType = req.file.mimetype;

		const { id } = await metaModel.createMeta({
			user_id: userId,
			imagem_meta: imageBuffer,
			tipo_imagem: imageType,
			nome_meta,
			valor_meta: Number(valor_meta),
			valor_destinado: Number(valor_destinado),
			periodo_deposito,
		});

		this.#scheduleHistoricoUpdate(userId, id);

		return res.redirect("/metas");
	}

	async #createMetaHistorico(metaId) {}

	#scheduleHistoricoUpdate(userId, metaId) {
		
	}
}

const CriarMetasControllerCreate = new CriarMetasController();

module.exports = CriarMetasControllerCreate;

// ! Preciso criar outra tabela no banco de dados, para guardar o histórico das metas, de quando a quantia foi depositada
