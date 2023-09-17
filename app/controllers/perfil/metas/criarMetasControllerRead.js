class CriarMetasController {
    getPage(req, res) {
        const premium = req.session.premium;

        return res.render("pages/criar-meta.ejs", {
            data: {
                page_name: "Criar meta",
                premium
            }
        });
    }
}

const CriarMetasControllerRead = new CriarMetasController();

module.exports = CriarMetasControllerRead;