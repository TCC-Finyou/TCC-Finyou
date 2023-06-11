class PacoteController {
    getPage(req, res) {
        return res.render("pages/pacotes.ejs")
    }
}

const PacoteControllerRead = new PacoteController();

module.exports = PacoteControllerRead;