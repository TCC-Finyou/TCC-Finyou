const stripe = Stripe("pk_test_51NHVbnEclZEWH4rDTDPJNTD7az32dnieSDClqIecEHZCABqCekO3TtWYmLqxuYNEdFbQMOgo6THkUqKeXeLFrkaO006OReYrQ4");

const form = document.querySelector("#assinatura-form");

function setMessage(message) {
	const messageDiv = document.querySelector("#mensagens");
	messageDiv.innerHTML = message;
}

const url = new URL(window.location.href);
const searchParams = new URLSearchParams(url.search);
const product = searchParams.get("product");

fetch("/pagamento-assinatura", {
	method: "POST",
	headers: {
		"Content-Type": "application/json",
	},
	body: JSON.stringify({
		product
	}),
}).then(async (res) => {
	const jsonRes = await res.json();

	if (jsonRes.erro) {
		setMessage(`Erro de sistema. Por favor tente novamente mais tarde!`);
		return;
	}

	const clientSecret = jsonRes.clientSecret;
	const elements = stripe.elements({
		clientSecret,
	});

	const paymentElement = elements.create("payment", {
		layout: "tabs",
		fields: {
			billingDetails: {
				name: "auto",
				email: "auto",
			},
		},
	});
	paymentElement.mount("#cartao-elemento");

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		stripe
			.confirmPayment({
				elements,
				confirmParams: {
					return_url: "https://finyou.up.railway.app/compra-efetuada",
				},
			})
			.then(function (result) {
				if (result.error) {
					setMessage(`Pagamento não realizado: ${result.error.message}`);
				}
			});
	});
});

// This sample only supports a Subscription with payment
// upfront. If you offer a trial on your subscription, then
// instead of confirming the subscription's latest_invoice's
// payment_intent. You'll use stripe.confirmCardSetup to confirm
// the subscription's pending_setup_intent.
// See https://stripe.com/docs/billing/subscriptions/trials
