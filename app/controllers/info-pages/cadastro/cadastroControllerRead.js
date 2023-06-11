class CadastroController {
    getPage(req, res) {
        return res.render("pages/cadastro.ejs")
    }
}

const CadastroControllerRead = new CadastroController();

module.exports = CadastroControllerRead;