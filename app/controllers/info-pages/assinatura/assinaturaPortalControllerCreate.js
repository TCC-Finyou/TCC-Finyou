const stripe = require("../../../../server/payments/stripe")
const userModel = require("../../../models/Usuario");
const jwt = require("jsonwebtoken");
class AssinaturaPortalController {
	async criarPortalAssinatura(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.secret);

        const user = await userModel.findUserById(userId);

        try {
            console.log("id do usuário: ", user.customer_id);

            console.log("link de retorno: ",`${DOMAIN}perfil`);
            const session = await stripe.billingPortal.sessions.create({
                customer: user.customer_id,
                return_url: `${DOMAIN}perfil`,
            });

            res.redirect(session.url);
        } catch (error) {
            console.log(error);
            res.redirect("/pacotes");
        }
	}
}

const AssinaturaPortalControllerCreate = new AssinaturaPortalController();

module.exports = AssinaturaPortalControllerCreate;
