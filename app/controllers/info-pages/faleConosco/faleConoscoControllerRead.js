class FaleConoscoController {
    getPage(req, res) {
        return res.render("pages/fale-conosco.ejs", {
            data: {
                page_name: "Fale conosco"
            }
        })
    }
}

const FaleConoscoControllerRead = new FaleConoscoController();

module.exports = FaleConoscoControllerRead;