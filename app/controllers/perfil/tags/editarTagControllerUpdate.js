const tagModel = require("../../../models/Tag");
const jwt = require("jsonwebtoken");

class EditarTagController {
	async updateTag(req, res) {
        const token = req.session.token;
        const {userId, userType} = jwt.decode(token, process.env.SECRET);

        const { tagId } = req.params;
        const tag = await tagModel.getTagById(tagId);

        if (userId !== tag.user_id && userType !== "admin") {
            return res.redirect("/perfil");
        }

		const { nome_tag, cor_tag } = req.body;

		try {
            await tagModel.updateTag(tagId, {
                nome_tag,
                cor_tag
            });

            if (userType === "admin") {
                return res.redirect("/tags-admin");
            }

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