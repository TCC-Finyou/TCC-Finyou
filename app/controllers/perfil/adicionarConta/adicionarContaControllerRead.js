class AdicionarContaController {
    getPage(req, res) {
        return res.render("pages/adicionar-conta.ejs");
    }
}

const AdicionarContaControllerRead = new AdicionarContaController();

module.exports = AdicionarContaControllerRead;