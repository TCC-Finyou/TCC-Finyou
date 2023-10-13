class EditarPerfilController {
    getPage(req, res) {
        return res.render("pages/editar-perfil.ejs", {
            data: {
                page_name: "Finyou"
            }
        })
    }
}

const editarPerfilControllerRead = new EditarPerfilController();

module.exports = editarPerfilControllerRead;