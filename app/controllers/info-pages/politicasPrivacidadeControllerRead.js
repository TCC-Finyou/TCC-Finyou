class PoliticasPrivacidadeController {
    getPage(req, res) {
        return res.render("pages/politicas-privacidade.ejs", {
            data: {
                page_name: "Políticas de privacidade"
            }
        })
    }
}

const politicasPrivacidadeControllerRead = new PoliticasPrivacidadeController();

module.exports = politicasPrivacidadeControllerRead;