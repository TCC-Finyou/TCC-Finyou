class HomeController {
    getPage(req, res) {
        return res.render("pages/index.ejs", {
            data: {
                page_name: "Finyou"
            }
        })
    }
}

const HomeControllerRead = new HomeController();

module.exports = HomeControllerRead;