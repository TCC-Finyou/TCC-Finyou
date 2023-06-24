class RedefinirSenhaController {
    getPage(req, res) {
        const token = req.params.token;

        return res.render("pages/redefinir-senha.ejs", {
            data: {
                page_name: "Redefinir senha",
                token_validation: "valid_token",
                token
            }
        })
    }
}

const RedefinirSenhaControllerRead = new RedefinirSenhaController();

module.exports = RedefinirSenhaControllerRead;