const stripe = require('../../../server/payments/stripe');
const userModel = require("../../models/Usuario");

class StripeWebhook {
	constructor() {
		this.realTimeUpdate = this.realTimeUpdate.bind(this);
	}

	realTimeUpdate(req, res) {
		let event = req.body;

		const endpointSecret = process.env.WEBHOOK_SECRET;

		if (endpointSecret) {
			const signature = req.headers["stripe-signature"];
            const rawBody = req.body;

			try {
				event = stripe.webhooks.constructEvent(rawBody, signature, endpointSecret);
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

            case "payment_intent.succeeded":
                this.#handleInvoicePaid(event);

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
        const customerId = event.data.object.customer;
        await userModel.updateUserPremiumByCustomerId(customerId);
    }
}

const stripeWebhook = new StripeWebhook();

module.exports = stripeWebhook;
