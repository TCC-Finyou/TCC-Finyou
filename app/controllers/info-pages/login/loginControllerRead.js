class LoginController {
    getPage(req, res) {
        return res.render("pages/login.ejs")
    }
}

const LoginControllerRead = new LoginController();

module.exports = LoginControllerRead;