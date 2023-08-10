const stripe = require("stripe")(process.env.STRIPE_SECRET);
const userModel = require("../../../models/Usuario");
const jwt = require("jsonwebtoken");
class AssinaturaPortalController {
	async criarPortalAssinatura(req, res) {
        const token = req.session.token;
        const {userId} = jwt.decode(token, process.env.secret);

        const user = await userModel.findUserById(userId);

        const session = await stripe.billingPortal.sessions.create({
            customer: user.customer_id,
            return_url: "https://finyou.up.railway.app/pacotes",
        });

        res.redirect(session.url);
	}
}

const AssinaturaPortalControllerCreate = new AssinaturaPortalController();

module.exports = AssinaturaPortalControllerCreate;
