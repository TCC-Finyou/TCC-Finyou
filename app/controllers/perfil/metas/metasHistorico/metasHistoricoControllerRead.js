class MetaHistoricoController {
    getPage(req, res) {
        const premium = req.session.premium;

        return res.render("pages/metas-historico.ejs", {
            data: {
                page_name: "Histórico da meta",
                premium
            }
        });
    }
}

const metaHistoricoControllerRead = new MetaHistoricoController();

module.exports = metaHistoricoControllerRead;