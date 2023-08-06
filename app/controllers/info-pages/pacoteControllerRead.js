const jwt = require("jsonwebtoken");

class PacoteController {
    getPage(req, res) {
        const token = req.session.token;
        let userLogged;

        if (!token) {
            userLogged = false;
        }

        try {
            jwt.verify(token, process.env.SECRET);

            userLogged = true;
        } catch (erro) {
            userLogged = false;
        }

        return res.render("pages/pacotes.ejs", {
            data: {
                page_name: "Pacotes",
                user_logged: userLogged,
            }
        })
    }
}

const PacoteControllerRead = new PacoteController();

module.exports = PacoteControllerRead;