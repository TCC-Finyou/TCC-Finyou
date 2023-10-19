const tagModel = require("../../../models/Tag");
const jwt = require("jsonwebtoken");

class CriarTagController {
	async createTag(req, res) {
        const { nome_tag, cor_tag } = req.body;

		try {
            const token = req.session.token;
			const { userId, userType } = jwt.decode(token, process.env.secret);
            let tag_global = 0;

            if (userType === "admin") {
                tag_global = 1;
            }

			await tagModel.createTag({
                user_id: userId,
				nome_tag,
				cor_tag,
                tag_global
			});

            if (userType === "admin") {
                return res.redirect(`/tags-admin/${userId}`);
            }

			return res.redirect("/tags");
		} catch (erro) {
			console.log(erro);

			const premium = req.session.premium;

			return res.render("pages/criar-tag.ejs", {
				data: {
					page_name: "Criar tag",
					premium,
                    input_values: {
                        nome_tag,
                        cor_tag
                    },
                    errors: {
                        sistema_error: {
                            msg: "Erro de sistema, tente novamente mais tarde!"
                        }
                    }
				},
			});
		}
	}
}

const criarTagControllerCreate = new CriarTagController();

module.exports = criarTagControllerCreate;
