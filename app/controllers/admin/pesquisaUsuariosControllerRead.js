const usuarioModel = require("../../models/Usuario");
const jwt = require("jsonwebtoken");

class PesquisaUsuarioController {
    async getPage(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.SECRET);
        const filtroPesquisa = req.query.filtro_pesquisa;

        const user = await usuarioModel.findUserById(userId);
        const users = await usuarioModel.findAllUsersPesquisados(filtroPesquisa);

        return res.render("pages/admin/perfil-admin.ejs", {
            data: {
                page_name: "Finyou",
                user,
                users,
                filtroPesquisa
            }
        })
    }
}

const pesquisaUsuarioControllerRead = new PesquisaUsuarioController();

module.exports = pesquisaUsuarioControllerRead;