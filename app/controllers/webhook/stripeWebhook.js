const stripe = require("../../../server/payments/stripe");
const userModel = require("../../models/Usuario");

class StripeWebhook {
	constructor() {
		this.realTimeUpdate = this.realTimeUpdate.bind(this);
	}

	realTimeUpdate(req, res) {
		let event;

		const webhookSecret = process.env.WEBHOOK_SECRET;

		if (webhookSecret) {
			const signature = req.headers["stripe-signature"];
			const rawBody = req.body;

			try {
				event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
			} catch (err) {
				console.log(`⚠️  Webhook signature verification failed.`, err.message);
				return res.sendStatus(400);
			}
		}

		console.log("----------------------------------------------------------------");
		console.log(`O evento disparado foi: ${event.type}`);
		console.log("----------------------------------------------------------------");

		switch (event.type) {
			case "customer.subscription.trial_will_end":
				this.#handleSubscriptionTrialEnding();

				break;
			case "customer.subscription.deleted":
				this.#handleSubscriptionDeleted();

				break;
			case "customer.subscription.created":
				this.#handleSubscriptionCreated();

				break;
			case "customer.subscription.updated":
				this.#handleSubscriptionUpdated();

				break;

			case "invoice.finalized":
				this.#handleInvoicePaid(event);

				break;

			case "invoice.payment_failed":
				this.#handleInvoicePaymentFailed(event);

				break;

			default:
				console.log(`Unhandled event type ${event.type}.`);
		}

		res.sendStatus(200);
	}

	#handleSubscriptionTrialEnding() {
		console.log("O tempo de teste gratuito acabou!");
	}

	#handleSubscriptionDeleted() {
		console.log("O seu plano foi cancelado");
	}

	#handleSubscriptionCreated() {
		console.log("O seu plano foi criado");
	}

	#handleSubscriptionUpdated() {
		console.log("O seu plano foi atualizado");
	}

	async #handleInvoicePaid(event) {
		try {
			const customerId = event.data.object.customer;
			await userModel.addUserPremiumByCustomerId(customerId);

			console.log(`O usuário de customer_id: ${customerId} acabou de pagar o plano`);
		} catch (erro) {
			console.log(erro);
		}
	}

	async #handleInvoicePaymentFailed(event) {
		try {
			const customerId = event.data.object.customer;
			await userModel.removeUserPremiumByCustomerId(customerId);

			console.log(`O usuário de customer_id: ${customerId} não pagou o plano`);
		} catch (erro) {
			console.log(erro);
		}
	}
}

const stripeWebhook = new StripeWebhook();

module.exports = stripeWebhook;
