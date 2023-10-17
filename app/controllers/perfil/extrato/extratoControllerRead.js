class ExtratoController {
    getPage(req, res) {
        const premium = req.session.premium;

        return res.render("pages/extrato.ejs", {
            data: {
                page_name: "Extrato",
                premium
            }
        })
    }
}

const extratoControllerRead = new ExtratoController();

module.exports = extratoControllerRead;