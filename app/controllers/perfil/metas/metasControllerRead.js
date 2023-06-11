class MetasController {
    getPage(req, res) {
        res.render("pages/metas.ejs");
    }
}

const MetasControllerRead = new MetasController();

module.exports = MetasControllerRead;