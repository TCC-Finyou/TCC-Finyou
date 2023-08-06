const stripe = require("stripe")(process.env.STRIPE_SECRET);

class AssinaturaPortalController {
	async criarPortalAssinatura(req, res) {
		const { session_id } = req.body;
		const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

		const returnUrl = process.env.DOMAIN;

		const portalSession = await stripe.billingPortal.sessions.create({
			customer: checkoutSession.customer,
			return_url: returnUrl,
		});

		res.redirect(303, portalSession.url);
	}
}

const AssinaturaPortalControllerCreate = new AssinaturaPortalController();

module.exports = AssinaturaPortalControllerCreate;
