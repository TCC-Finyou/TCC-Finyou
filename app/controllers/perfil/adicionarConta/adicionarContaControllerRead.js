class AdicionarContaController {
    getPage(req, res) {
        const premium = req.session.premium;

        return res.render("pages/adicionar-conta.ejs", {
            data: {
                page_name: "Adicionar conta",
                premium
            }
        });
    }
}

const AdicionarContaControllerRead = new AdicionarContaController();

module.exports = AdicionarContaControllerRead;