class RelatorioController {
    getPage(req, res) {
        const premium = req.session.premium;

        return res.render("pages/relatorios.ejs", {
            data: {
                page_name: "Relatórios",
                premium
            }
        });
    }
}

const relatorioControllerRead = new RelatorioController();

module.exports = relatorioControllerRead;