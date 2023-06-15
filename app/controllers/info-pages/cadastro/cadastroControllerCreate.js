const prisma = require("../../../../server/database/prismaClient");

// req.encryptedPassword

class CadastroController {
    async createUser(req, res) {
        const {
            nome,
            email,
            data_nascimento,
            senha
        } = req.body;
        const senhaCriptografada = req.encryptedPassword;
        const data_nascimento_array = data_nascimento.split('/');
        const data_nascimento_formated = new Date(`${data_nascimento_array[2]}/${data_nascimento_array[1]}/${data_nascimento_array[0]}`);

        try {
            await prisma.usuario.create({
                data: {
                    nome,
                    email,
                    data_nascimento: data_nascimento_formated,
                    senha: senhaCriptografada
                }
            })

            return res.redirect("/login");
        } catch (erro) {
            console.log(erro);
            return res.render("pages/cadastro.ejs", {
                data: {
                    page_name: "Cadastro",
                    input_values: {
                        nome,
                        email,
                        data_nascimento,
                        senha
                    },
                    errors: {
                        sistema_error: {
                            msg: "Erro de sistema, tente novamente mais tarde!"
                        }
                    }
                }
            });
        }
    }
}

const CadastroControllerCreate = new CadastroController();

module.exports = CadastroControllerCreate;