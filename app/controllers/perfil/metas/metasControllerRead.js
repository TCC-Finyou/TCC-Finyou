const metaModel = require("../../../models/Meta");
const jwt = require("jsonwebtoken");

class MetasController {
    async getPage(req, res) {
        const premium = req.session.premium;
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.secret);

        const metas = await metaModel.getAllMetasFromUser(userId);

        return res.render("pages/metas.ejs", {
            data: {
                page_name: "Metas",
                premium,
                metas
            }
        });
    }
}

const MetasControllerRead = new MetasController();

module.exports = MetasControllerRead;