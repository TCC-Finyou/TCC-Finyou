class FaleConoscoController {
    getPage(req, res) {
        return res.render("pages/fale-conosco.ejs")
    }
}

const FaleConoscoControllerRead = new FaleConoscoController();

module.exports = FaleConoscoControllerRead;