const tagModel = require("../../../models/Tag");

class EditarTagController {
	async updateTag(req, res) {
        const { tagId } = req.params;

		const { nome_tag, cor_tag } = req.body;

		try {
            await tagModel.updateTag(tagId, {
                nome_tag,
                cor_tag
            });

			return res.redirect("/tags");
		} catch (error) {
			console.log(error);

			const premium = req.session.premium;

			return res.render("pages/editar-tag.ejs", {
				data: {
					page_name: `Editar tag: ${nome_tag}`,
					premium,
					input_values: {
                        id: tagId,
						nome_tag,
                        cor_tag
					},
					errors: {
						sistema_error: {
							msg: "Erro de sistema, tente novamente mais tarde!",
						},
					}
				},
			});
		}
	}
}

const editarTagControllerUpdate = new EditarTagController();

module.exports = editarTagControllerUpdate;