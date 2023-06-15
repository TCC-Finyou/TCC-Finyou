class MetasController {
    getPage(req, res) {
        const premium = req.session.premium;

        return res.render("pages/metas.ejs", {
            data: {
                page_name: "Metas",
                premium
            }
        });
    }
}

const MetasControllerRead = new MetasController();

module.exports = MetasControllerRead;