class PacoteController {
    getPage(req, res) {
        res.render("pages/pacotes.ejs")
    }
}

const PacoteControllerRead = new PacoteController();

module.exports = PacoteControllerRead;