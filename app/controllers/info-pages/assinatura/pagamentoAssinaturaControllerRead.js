class PagamentoAssinaturaController {
    getPage(req, res) {
        return res.render("pages/pagamento-assinatura.ejs", {
            data: {
                page_name: "Assinar pacote"
            }
        });
    }
}

const PagamentoAssinaturaControllerRead = new PagamentoAssinaturaController();

module.exports = PagamentoAssinaturaControllerRead;