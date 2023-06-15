class HomePerfilController {
    getPage(req, res) {
        const premium = req.session.premium;

        return res.render("pages/perfil.ejs", {
            data: {
                page_name: "Perfil",
                premium
            }
        })
    }
}

const HomePerfilControllerRead = new HomePerfilController();

module.exports = HomePerfilControllerRead;