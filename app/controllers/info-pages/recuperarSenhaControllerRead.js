const mailer = require("nodemailer");
const usuarioModel = require("../../models/Usuario");
const tokenModel = require("../../models/Token");

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

        const user = await usuarioModel.findUserByEmail(email);

        if (!user) {
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

        const token = await tokenModel.createToken(email);

        try {
            await this.#sendMail(email, token.id);

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
            <a href="${process.env.DOMAIN}redefinir-senha/${token}" style="font-size: 1.5rem; line-height: 1.5;">Trocar minha senha da Finyou</a>
            <br><br>
            <a href="${process.env.DOMAIN}" style="font-size: 1.5rem; line-height: 1.5;"><img src="${process.env.DOMAIN}assets/images/assinatura-email.jpg" alt="Assinatura Finyou" style="width: 600px;"></a>
            `
        }

        await transporter.sendMail(mailOptions);
    }
}

const RecuperarSenhaControllerRead = new RecuperarSenhaController();

module.exports = RecuperarSenhaControllerRead;