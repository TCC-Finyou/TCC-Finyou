const mailer = require("nodemailer");
const prisma = require("../../../server/database/prismaClient");

class RecuperarSenhaController {
    constructor() {
        this.recoverPassword = this.recoverPassword.bind(this);
    }

    getPage(req, res) {
        return res.render("pages/recuperar-senha.ejs", {
            data: {
                page_name: "Recuperar senha",
                mail_sended: false
            }
        })
    }

    async recoverPassword(req, res) {
        const { email } = req.body;

        const user = await prisma.usuario.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            console.log("Usuário não encontrado!");
            return res.render("pages/recuperar-senha.ejs", {
                data: {
                    page_name: "Recuperar senha",
                    input_values: {
                        email
                    },
                    errors: {
                        email_error: {
                            msg: "Usuário não encontrado"
                        }
                    }
                }
            });
        }

        const token = await prisma.token.create({
            data: {
                user_email: email
            }
        });

        try {
            this.#sendMail(email, token.id);

            return res.render("pages/recuperar-senha.ejs", {
                data: {
                    page_name: "Recuperar senha",
                    mail_sended: true
                }
            });
        } catch (error) {
            console.log(error);

            return res.render("pages/recuperar-senha.ejs", {
                data: {
                    page_name: "Recuperar senha",
                    mail_sended: false,
                    input_values: {
                        email
                    },
                    errors: {
                        sistema_error: {
                            msg: "Erro de sistema, tente novamente mais tarde!"
                        }
                    }
                }
            })
        }
    }

    async #sendMail(email, token) {
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
            subject: "Recuperação de senha Finyou",
            html: `
            <h1 style="font-size: 4rem; color: #095a72">Finyou</h1>
            <p style="font-size: 1.5rem; line-height: 1.5; color: #404040">Para recuperar a sua conta na finyou acesse o link abaixo e digite uma nova senha para se conectar a sua conta!</p>
            <a href="https://tcc-finyou-production.up.railway.app/redefinir-senha/${token}" style="font-size: 1.5rem; line-height: 1.5;">Trocar minha senha da Finyou</a>
            <br><br>
            <a href="https://tcc-finyou-production.up.railway.app" style="font-size: 1.5rem; line-height: 1.5;"><img src="https://tcc-finyou-production.up.railway.app/assets/images/assinatura-email.jpg" alt="Assinatura Finyou" style="width: 600px;"></a>
            `
        }

        await transporter.sendMail(mailOptions);
    }
}

const RecuperarSenhaControllerRead = new RecuperarSenhaController();

module.exports = RecuperarSenhaControllerRead;