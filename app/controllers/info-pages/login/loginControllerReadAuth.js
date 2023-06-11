class LoginController {
    authUser(req, res) {
        return res.redirect("/perfil");
    }
}

const LoginControllerReadAuth = new LoginController();

module.exports = LoginControllerReadAuth;