class LoginController {
    getPage(req, res) {
        res.render("pages/login.ejs")
    }
}

const LoginControllerRead = new LoginController();

module.exports = LoginControllerRead;