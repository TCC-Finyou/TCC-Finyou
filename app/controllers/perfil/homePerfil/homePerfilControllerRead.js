class HomePerfilController {
    getPage(req, res) {
        res.render("pages/perfil.ejs");
    }
}

const HomePerfilControllerRead = new HomePerfilController();

module.exports = HomePerfilControllerRead;