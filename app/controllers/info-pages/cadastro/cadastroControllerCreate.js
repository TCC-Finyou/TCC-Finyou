const prisma = require("../../../../server/database/prismaClient");

// req.encryptedPassword

class CadastroController {
    async createUser(req, res) {
        const {
            nome,
            email,
            data_nascimento
        } = req.body;
        const senha = req.encryptedPassword;
        const data_nascimento_formated = new Date(data_nascimento);

        try {
            await prisma.usuario.create({
                data: {
                    nome,
                    email,
                    data_nascimento: data_nascimento_formated,
                    senha
                }
            })

            return res.redirect("/login")
        } catch (erro) {
            console.log(erro)
            return res.render("pages/cadastro.ejs")
        }
    }
}

const CadastroControllerCreate = new CadastroController();

module.exports = CadastroControllerCreate;