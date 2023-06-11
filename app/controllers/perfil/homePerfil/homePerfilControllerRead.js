class HomePerfilController {
    getPage(req, res) {
        return res.render("pages/perfil.ejs");
    }
}

const HomePerfilControllerRead = new HomePerfilController();

module.exports = HomePerfilControllerRead;