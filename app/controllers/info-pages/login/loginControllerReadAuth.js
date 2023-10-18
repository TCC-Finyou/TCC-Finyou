const jwt = require("jsonwebtoken");

class LoginController {
    async authUser(req, res) {
        const token = req.session.token;
        const {userType} = jwt.decode(token, process.env.SECRET);

        if (userType === "admin") {
            return res.redirect("/perfil-admin");
        }

        const loginRedirectUrl = req.session.loginRedirectUrl ? req.session.loginRedirectUrl : "/perfil";
        req.session.loginRedirectUrl = null;
        return res.redirect(loginRedirectUrl);
    }
}

const LoginControllerReadAuth = new LoginController();

module.exports = LoginControllerReadAuth;