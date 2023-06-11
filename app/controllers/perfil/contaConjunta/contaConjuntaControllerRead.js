class ContaConjuntaController {
    getPage(req, res) {
        return res.render("pages/comprar-pacote.ejs");
    }
}

const ContaConjuntaControllerRead = new ContaConjuntaController();

module.exports = ContaConjuntaControllerRead;