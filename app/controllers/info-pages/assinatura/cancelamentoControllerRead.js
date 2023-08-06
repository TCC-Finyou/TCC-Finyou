class CancelamentoController {
    getPage(req, res) {
        return res.render("pages/cancelar-assinatura.ejs", {
            data: {
                page_name: "Assinatura cancelada"
            }
        });
    }
}

const CancelamentoControllerRead = new CancelamentoController();

module.exports = CancelamentoControllerRead;