const jwt = require("jsonwebtoken");

class NotFoundPage {
    getNotFoundPage(req, res, next) {
        const token = req.session.token;

        if (!token) {
            return res.status(404).render("pages/nao-encontrado.ejs", {
                data: {
                    page_name: "Página não encontrada",
                    user_logged: false
                }
            });
        }

        try {
            jwt.verify(token, process.env.SECRET);

            return res.status(404).render("pages/nao-encontrado.ejs", {
                data: {
                    page_name: "Página não encontrada",
                    user_logged: true
                }
            });
        } catch (erro) {
            console.log(erro);
            return res.status(404).render("pages/nao-encontrado.ejs", {
                data: {
                    page_name: "Página não encontrada",
                    user_logged: false
                }
            });
        }
    }
}

const notFoundPageMiddleware = new NotFoundPage();

module.exports = notFoundPageMiddleware;