class AdicionarContaController {
	getPage(req, res) {
		const premium = req.session.premium;

		const url = "https://sandbox.belvo.com/api/token/";

		const headers = {
			"Content-Type": "application/json",
			Host: "sandbox.belvo.com",
		};

		const data = {
			id: "233193a6-78e6-4d6a-8613-326e64efba9a",
			password: "g9_Qr-pk0BvC2727O5rbn5Mxv1jYR_KKW_gT#MBgYGmH#@DrAVZpn0q*bgvRG68V",
			scopes: "read_institutions,write_links",
		};

		const requestOptions = {
			method: "POST",
			headers: headers,
			body: JSON.stringify(data),
		};

		fetch(url, requestOptions)
			.then((response) => response.json())
			.then((data) => console.log(data))
			.catch((error) => console.error("Error:", error));

		return res.render("pages/adicionar-conta.ejs", {
			data: {
				page_name: "Adicionar conta",
				premium,
			},
		});
	}
}

const AdicionarContaControllerRead = new AdicionarContaController();

module.exports = AdicionarContaControllerRead;
