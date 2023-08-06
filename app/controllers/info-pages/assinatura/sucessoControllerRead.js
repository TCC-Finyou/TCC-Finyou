class SucessoController {
    getPage(req, res) {
        return res.render("pages/sucesso-assinatura.ejs", {
            data: {
                page_name: "Assinatura realizada"
            }
        });
    }
}

const SucessoControllerRead = new SucessoController();

module.exports = SucessoControllerRead;