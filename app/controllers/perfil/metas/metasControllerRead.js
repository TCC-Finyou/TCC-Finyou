class MetasController {
    getPage(req, res) {
        return res.render("pages/metas.ejs");
    }
}

const MetasControllerRead = new MetasController();

module.exports = MetasControllerRead;