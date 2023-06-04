class HomeController {
    getPage(req, res) {
        res.render("pages/index.ejs")
    }
}

const HomeControllerRead = new HomeController();

module.exports = HomeControllerRead;