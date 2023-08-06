class LoginController {
    async authUser(req, res) {
        const loginRedirectUrl = req.session.loginRedirectUrl ? req.session.loginRedirectUrl : "/perfil";
        return res.redirect(loginRedirectUrl);
    }
}

const LoginControllerReadAuth = new LoginController();

module.exports = LoginControllerReadAuth;