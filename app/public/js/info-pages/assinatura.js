const stripe = Stripe("pk_live_51NHVbnEclZEWH4rDokITBkLzAOVV4dTPXDPbc4rpvzJpGwMrCdjGUPsM6sdxw8IooWXeYy5x2RfWw1tSHamO2NHk007K3VvAOm");

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
					return_url: `https://finyou.up.railway.app/compra-efetuada`,
				},
			})
			.then(function (result) {
				if (result.error) {
					setMessage(`Pagamento não realizado: ${result.error.message}`);
				}
			});
	});
});