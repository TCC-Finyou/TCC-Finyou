const pagbank = require("../../../../server/payments/pagbank");

const usuarioModel = require("../../../models/Usuario");
const jwt = require("jsonwebtoken");

class PagamentoAssinaturaController {
	async createCustomerSubscription(req, res) {
		try {
			const token = req.session.token;
			const { userId } = jwt.decode(token, process.env.SECRET);
			const user = await usuarioModel.findUserById(userId);
			// const product = req.body.product;
			// let productSelected = "price_1NemYBEclZEWH4rDy38nZKJ3";

			// switch(product) {
			//     case "anual":
			//         productSelected = "price_1NdNjrEclZEWH4rDiOJt5aG3";
			//     break;

			//     case "teste":
			//         productSelected = "price_1NdNjrEclZEWH4rDiOJt5aG3";
			//     break;

			//     default:
			//         ! Aqui eu vou fazer uma verificação, se o usuário já tiver assinado esse plano ele não pode ter o primeiro mês gratuito, então eu vou gravar no banco um valor de verdadeiro ou falso para isso
			//         productSelected = "price_1NSmmlEclZEWH4rDH0sovCIa";
			// }

			// const customer = await stripe.customers.create({
			// 	email: user.email,
			// });s

			const customer = await pagbank.criarAssinante(
				{
					address: {
						street: "string",
						number: "123",
						complement: "string",
						locality: "string",
						city: "string",
						region_code: "SP",
						country: "BRA",
						postal_code: "78110235",
					},
					reference_id: "string",
					name: "Vinícius Gonçalves",
					email: "email8@gmail.com",
					tax_id: "37954489051",
					phones: [
						{
							country: "55",
							area: "11",
							number: "992063055",
						},
					],
					birth_date: "2000-05-24",
				},
				{
					authorization: "sha512-m7DaSDyps8XfdK9T0C/Az+QhDyOgXu0h+nCBWSbbBjXv4FV6O6LBjBbeCCTu6VhmG9BK4JdLi4ejon/FEC1d8Q==?13BA",
				}
			);

			console.log(customer);

			const subscription = await pagbank.criarAssinatura({
				reference_id: "string",
				plan: { id: "string" },
				customer: { id: "string" },
				payment_method: [{ type: "CREDIT_CARD" }],
				amount: { value: 10, currency: "BRL" },
				pro_rata: true,
				best_invoice_date: { day: 0, month: "string" },
			});

			console.log(subscription);

			return res.redirect("/pacotes");

			// const subscription = await stripe.subscriptions.create({
			// 	customer: customer.id,
			// 	items: [
			// 		{
			// 			price: productSelected
			// 		},
			// 	],
			//     trial_period_days: 1,
			// 	payment_behavior: "default_incomplete",
			// 	expand: ["pending_setup_intent"],
			// });

			// usuarioModel.uppdateUserCustomerId(userId, customer.id);

			// return res.send({
			//     clientSecret: subscription.pending_setup_intent.client_secret
			// });
		} catch (erro) {
			console.log(erro);
			return res.send({ erro });
		}
	}
}

const PagamentoAssinaturaControllerCreate = new PagamentoAssinaturaController();

module.exports = PagamentoAssinaturaControllerCreate;
