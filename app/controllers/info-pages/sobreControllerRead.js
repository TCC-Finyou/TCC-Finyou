class SobreController {
    getPage(req, res) {
        res.render("pages/sobre.ejs")
    }
}

const sobreControllerRead = new SobreController();

module.exports = sobreControllerRead;