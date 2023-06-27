const mailer = require("nodemailer");
const prisma = require("../../../../server/database/prismaClient");

class RedefinirSenhaController {
    constructor() {
        this.updatePassword = this.updatePassword.bind(this);
    }

    async updatePassword(req, res) {
        const token = req.params.token;

        const user_token = await prisma.token.findUnique({
            where: {
                id: token
            }
        });

        const user_email = user_token.user_email;

        try {
            await this.#sendMail(user_email);

            await prisma.usuario.update({
                where: {
                    email: user_email
                },
                data: {
                    senha: req.encryptedPassword
                }
            });

            return res.redirect("/login");
        } catch (error) {
            console.log(error);

            return res.render("pages/redefinir-senha.ejs", {
                data: {
                    page_name: "Redefinir senha",
                    token_validation: "valid_token",
                    token,
                    input_values: {
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

    async #sendMail(email) {
        const transporter = mailer.createTransport({
            service: "gmail",
            auth: {
                user: "tcc.finyou@gmail.com",
                pass: "zltzhzgahdxvkbsu"
            }
        });

        const mailOptions = {
            from: "tcc.finyou@gmail.com",
            to: email,
            subject: "Senha Alterada",
            html: `
            <h1 style="font-size: 4rem; color: #095a72">Finyou</h1>
            <p style="font-size: 1.5rem; line-height: 1.5; color: #404040">A senha da sua conta Finyou foi alterada!</p>
            <a href="https://tcc-finyou-production.up.railway.app"><img src="https://tcc-finyou-production.up.railway.app/assets/images/assinatura-email.jpg" alt="Assinatura Finyou" style="width: 600px;"></a>
            `
        }

        await transporter.sendMail(mailOptions);
    }
}

const RedefinirSenhaControllerUpdate = new RedefinirSenhaController();

module.exports = RedefinirSenhaControllerUpdate;