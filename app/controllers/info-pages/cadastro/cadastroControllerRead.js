class CadastroController {
    getPage(req, res) {
        return res.render("pages/cadastro.ejs", {
            data: {
                page_name: "Cadastro"
            }
        })
    }
}

const CadastroControllerRead = new CadastroController();

module.exports = CadastroControllerRead;