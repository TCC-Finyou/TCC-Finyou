class PacoteController {
    getPage(req, res) {
        return res.render("pages/pacotes.ejs", {
            data: {
                page_name: "Pacotes"
            }
        })
    }
}

const PacoteControllerRead = new PacoteController();

module.exports = PacoteControllerRead;