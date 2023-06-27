const jwt = require("jsonwebtoken");
const prisma = require("../../../../server/database/prismaClient");
const mailer = require("nodemailer");
class FaleConoscoController {
    constructor() {
        this.getPage = this.getPage.bind(this);
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

            const userEmail = await this.#getUserEmail(userId);

            return res.render("pages/fale-conosco.ejs", {
                data: {
                    page_name: "Fale conosco",
                    user_logged: true,
                    email_sended: false,
                    userEmail
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

    async sendMail(req, res) {
        const {
            email,
            duvida
        } = req.body;
        const token = req.session.token;
        let userLogged;

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

        if (!token) {
            userLogged = false;
        } else {
            try {
                jwt.verify(token, process.env.SECRET);

                userLogged = true;
            } catch (error) {
                userLogged = false;
            }
        }

        try {
            await transporter.sendMail(mailOptions);

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

    async #getUserEmail(userId) {
        const user = await prisma.usuario.findUnique({
            where: {
                id: userId
            }
        });

        return user.email;
    }
}

const FaleConoscoControllerRead = new FaleConoscoController();

module.exports = FaleConoscoControllerRead;