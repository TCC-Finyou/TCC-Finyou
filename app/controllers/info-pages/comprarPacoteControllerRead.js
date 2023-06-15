class ComprarPacoteController {
    getPage(req, res) {
        return res.render("pages/comprar-pacote.ejs", {
            data: {
                page_name: "Comprar pacote"
            }
        });
    }
}

const ComprarPacoteControllerRead = new ComprarPacoteController();

module.exports = ComprarPacoteControllerRead;