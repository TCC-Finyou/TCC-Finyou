class ComprarPacoteController {
    getPage(req, res) {
        return res.render("pages/comprar-pacote.ejs");
    }
}

const ComprarPacoteControllerRead = new ComprarPacoteController();

module.exports = ComprarPacoteControllerRead;