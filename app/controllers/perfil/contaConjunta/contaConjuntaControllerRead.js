class ContaConjuntaController {
    getPage(req, res) {
        const premium = req.session.premium;

        return res.render("pages/comprar-pacote.ejs", {
            data: {
                page_name: "Comprar pacote",
                premium
            }
        });
    }
}

const ContaConjuntaControllerRead = new ContaConjuntaController();

module.exports = ContaConjuntaControllerRead;