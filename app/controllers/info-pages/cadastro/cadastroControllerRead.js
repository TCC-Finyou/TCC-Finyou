class CadastroController {
    getPage(req, res) {
        res.render("pages/cadastro.ejs")
    }
}

const CadastroControllerRead = new CadastroController();

module.exports = CadastroControllerRead;