const jwt = require("jsonwebtoken");
const mailer = require("nodemailer");
const usuarioModel = require("../../../models/Usuario");
class FaleConoscoController {
    constructor() {
        this.getPage = this.getPage.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    async getPage(req, res) {
        const token = req.session.token;

        if (!token) {
            return res.render("pages/fale-conosco.ejs", {
                data: {
                    page_name: "Fale conosco",
                    user_logged: false,
                    email_sended: false
                }
            })
        }

        try {
            jwt.verify(token, process.env.SECRET);

            const {userId} = jwt.decode(token);

            const user = await usuarioModel.findUserById(userId);

            return res.render("pages/fale-conosco.ejs", {
                data: {
                    page_name: "Fale conosco",
                    user_logged: true,
                    email_sended: false,
                    userEmail: user.email
                }
            })
        } catch (erro) {
            console.log(erro);
            return res.render("pages/fale-conosco.ejs", {
                data: {
                    page_name: "Fale conosco",
                    user_logged: false,
                    email_sended: false
                }
            })
        }
    }

    async sendMessage(req, res) {
        const {
            email,
            duvida
        } = req.body;

        const token = req.session.token;

        const userLogged = this.#verifyLogin(token);

        try {
            await this.#sendMail(email, duvida);

            return res.render("pages/fale-conosco.ejs", {
                data: {
                    page_name: "Fale conosco",
                    user_logged: userLogged,
                    email_sended: true
                }
            })
        } catch(error) {
            return res.render("pages/fale-conosco.ejs", {
                data: {
                    page_name: "Fale conosco",
                    user_logged: userLogged,
                    email_sended: false,
                    input_values: {
                        email,
                        duvida
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

    #verifyLogin(token) {
        if (!token) {
            return false;
        } else {
            try {
                jwt.verify(token, process.env.SECRET);

                return true;
            } catch (error) {
                return false;
            }
        }
    }

    async #sendMail(email, duvida) {
        const transporter = mailer.createTransport({
            service: "gmail",
            auth: {
                user: "tcc.finyou@gmail.com",
                pass: "zltzhzgahdxvkbsu"
            }
        })

        const mailOptions = {
            from: "tcc.finyou@gmail.com",
            to: "tcc.finyou@gmail.com",
            subject: "Contato de clientes Finyou",
            html: `
            <h1>Email de contato</h1>
            <p>
                Cliente: ${email}
                <br>
                Dúvida: ${duvida}
            </p>
            `
        }

        await transporter.sendMail(mailOptions);
    }
}

const FaleConoscoControllerRead = new FaleConoscoController();

module.exports = FaleConoscoControllerRead;