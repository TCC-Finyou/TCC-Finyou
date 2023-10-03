class CriarMetaController {
    getPage(req, res) {
        const premium = req.session.premium;

        return res.render("pages/criar-meta.ejs", {
            data: {
                page_name: "Criar meta",
                premium
            },
        });
    }
}

const CriarMetaControllerRead = new CriarMetaController();

module.exports = CriarMetaControllerRead;