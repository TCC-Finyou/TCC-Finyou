class HomeController {
    getHomePage(req, res) {
        res.render("pages/index.ejs")
    }
}

const HomeControllerRead = new HomeController();

module.exports = HomeControllerRead;