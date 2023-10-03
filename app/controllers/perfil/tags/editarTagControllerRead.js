const tagModel = require("../../../models/Tag");

class EditarTagController {
	async getPage(req, res) {
		const premium = req.session.premium;
		const { tagId } = req.params;

		try {
			const { nome_tag, cor_tag } = await tagModel.getTagById(tagId);

			return res.render("pages/editar-tag.ejs", {
				data: {
					page_name: `Editar meta: ${nome_tag}`,
					premium,
					input_values: {
                        id: tagId,
						nome_tag,
                        cor_tag
					}
				},
			});
		} catch (erro) {
			console.log(erro);

			return res.render("pages/editar-tag.ejs", {
				data: {
					page_name: "Editar tag",
					premium,
                    input_values: {
                        id: tagId
					},
					errors: {
						editar_tag_error: {
							msg: "Erro de sistema, tente novamente mais tarde!",
						},
					},
				},
			});
		}
	}
}

const editarTagControllerRead = new EditarTagController();

module.exports = editarTagControllerRead;