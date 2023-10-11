class editarPerfilController {
    getPage(req, res) {
        return res.render("pages/editar-perfil.ejs", {
            data: {
                page_name: "Finyou"
            }
        })
    }
}

const editarPerfilControllerRead = new editarPerfilController();

module.exports = editarPerfilControllerRead;