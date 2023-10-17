class LogoutController {
    logout(req, res) {
        req.session.destroy();

        res.redirect("/");
    }
}

const logoutControllerRead = new LogoutController();

module.exports = logoutControllerRead;