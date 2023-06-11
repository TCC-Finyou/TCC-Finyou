class AdicionarContaController {
    getPage(req, res) {
        res.render("pages/adicionar-conta.ejs");
    }
}

const AdicionarContaControllerRead = new AdicionarContaController();

module.exports = AdicionarContaControllerRead;