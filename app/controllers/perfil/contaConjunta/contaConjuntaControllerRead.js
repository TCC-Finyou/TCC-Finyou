class ContaConjuntaController {
    getPage(req, res) {
        const premium = req.session.premium;

        return res.render("pages/conta-conjunta.ejs", {
            data: {
                page_name: "Conta conjunta",
                premium
            }
        });
    }
}

const ContaConjuntaControllerRead = new ContaConjuntaController();

module.exports = ContaConjuntaControllerRead;