class SobreController {
    getPage(req, res) {
        return res.render("pages/sobre.ejs", {
            data: {
                page_name: "Sobre a Finyou"
            }
        })
    }
}

const sobreControllerRead = new SobreController();

module.exports = sobreControllerRead;