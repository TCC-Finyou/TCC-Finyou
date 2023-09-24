class CriarTagController {
    getPage(req, res) {
        const premium = req.session.premium;

        return res.render("pages/criar-tag.ejs", {
            data: {
                page_name: "Criar tag",
                premium
            }
        });
    }
}

const criarTagControllerRead = new CriarTagController();

module.exports = criarTagControllerRead;