const stripe = require("stripe")(process.env.STRIPE_SECRET);

class AssinaturaController {
	async criarAssinatura(req, res) {
		const selectedPlan = req.body.selected_plan;
		let price;

		switch (selectedPlan) {
			case "anual":
				{
					price = "price_1NTUEEEclZEWH4rDv2zDcInR";
				}
				break;

			default: {
				price = "price_1NSmmlEclZEWH4rDH0sovCIa";
			}
		}

		const session = await stripe.checkout.sessions.create({
			billing_address_collection: "auto",
			line_items: [
				{
					price: price,
					quantity: 1,
				},
			],
			mode: "subscription",
			success_url: `${process.env.DOMAIN}/compra-efetuada?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.DOMAIN}/compra-cancelada`,
		});

		res.redirect(303, session.url);
	}
}

const AssinaturaControllerCreate = new AssinaturaController();

module.exports = AssinaturaControllerCreate;
