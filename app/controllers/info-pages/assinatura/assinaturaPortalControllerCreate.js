const stripe = require("../../../../server/payments/stripe")
const userModel = require("../../../models/Usuario");
const jwt = require("jsonwebtoken");
class AssinaturaPortalController {
	async criarPortalAssinatura(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.secret);

        const user = await userModel.findUserById(userId);

        const session = await stripe.billingPortal.sessions.create({
            customer: user.customer_id,
            return_url: `${process.env.domain}/perfil`,
        });

        res.redirect(session.url);
	}
}

const AssinaturaPortalControllerCreate = new AssinaturaPortalController();

module.exports = AssinaturaPortalControllerCreate;
