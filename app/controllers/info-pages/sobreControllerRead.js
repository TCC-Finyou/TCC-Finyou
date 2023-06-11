class SobreController {
    getPage(req, res) {
        return res.render("pages/sobre.ejs")
    }
}

const sobreControllerRead = new SobreController();

module.exports = sobreControllerRead;