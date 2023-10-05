const metaModel = require("../../../models/Meta");

class DeletarMetaController {
	async deletarMeta(req, res) {
		const { metaId } = req.params;

		try {
			await metaModel.deleteMeta(metaId);

			return res.sendStatus(200);
		} catch (erro) {
			console.log(erro);

			return res.sendStatus(500);
		}
	}
}

const deletarMetaControllerDelete = new DeletarMetaController();

module.exports = deletarMetaControllerDelete;
