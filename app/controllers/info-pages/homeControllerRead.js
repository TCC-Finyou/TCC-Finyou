class HomeController {
    getPage(req, res) {
        return res.render("pages/index.ejs")
    }
}

const HomeControllerRead = new HomeController();

module.exports = HomeControllerRead;