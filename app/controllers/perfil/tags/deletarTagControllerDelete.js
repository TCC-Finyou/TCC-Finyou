const tagModel = require("../../../models/Tag.js");

class DeletarTagController {
	async deleteTag(req, res) {
		const { tagId } = req.params;

		try {
			await tagModel.deleteTag(tagId);

			return res.sendStatus(200);
		} catch (erro) {
			console.log(erro);

			return res.sendStatus(500);
		}
	}
}

const deletarTagControllerDelete = new DeletarTagController();

module.exports = deletarTagControllerDelete;
