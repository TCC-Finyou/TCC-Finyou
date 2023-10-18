class PerfilAdminController {
    getPage(req, res) {
        return res.render("pages/admin/perfil-admin.ejs", {
            data: {
                page_name: "Finyou"
            }
        })
    }
}

const perfilAdminControllerRead = new PerfilAdminController();

module.exports = perfilAdminControllerRead;