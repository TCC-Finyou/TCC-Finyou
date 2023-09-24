const periodoDepositoDropdownButton = document.querySelector("[data-periodo-deposito-dropdown-button]");

const periodoDepositoInputs = document.querySelectorAll("[data-periodo-deposito-input]");
const periodoDepositoPreview = document.querySelector("[data-periodo-deposito-selected]");

const valorMetaInput = document.querySelector("[data-input-meta=valor-meta]");
const valorDestinadoInput = document.querySelector("[data-input-meta=valor-destinado]");
const periodoDepositoInputPreview = document.querySelector("[data-input-meta-preview=periodo-deposito");
const metaInputs = document.querySelectorAll("[data-input-meta]");

function togglePeriodoDepositoDropdownButton() {
	periodoDepositoDropdownButton.classList.toggle("ativo");
}

function previewPeriodoDeposito(periodoDepositoSelected) {
	let tempoAlcancarMeta = Math.ceil(valorMetaInput.value / valorDestinadoInput.value);
	let periodoDepositoValue;

	switch (periodoDepositoSelected) {
		case "Diariamente":
			{
				periodoDepositoValue = tempoAlcancarMeta === 1 ? `${tempoAlcancarMeta} dia` : `${tempoAlcancarMeta} dias`;
			}
			break;

		case "Semanalmente":
			{
				periodoDepositoValue = tempoAlcancarMeta === 1 ? `${tempoAlcancarMeta} semana` : `${tempoAlcancarMeta} semanas`;
			}
			break;

		case "Quinzenalmente":
			{
				periodoDepositoValue = tempoAlcancarMeta === 1 ? `${tempoAlcancarMeta} quinzena` : `${tempoAlcancarMeta} quinzenas`;
			}
			break;

		case "Mensalmente":
			{
				periodoDepositoValue = tempoAlcancarMeta === 1 ? `${tempoAlcancarMeta} mês` : `${tempoAlcancarMeta} meses`;
			}
			break;
	}

	periodoDepositoInputPreview.innerText = periodoDepositoValue;
}

function selectPeriodoDeposito(e) {
	const parentSelected = e.target.parentNode;
	const parentContainer = e.target.parentNode.parentNode;
	const parentContainerChildren = parentContainer.children;

	for (const child of parentContainerChildren) {
		child.classList.remove("ativo");
	}

	parentSelected.classList.add("ativo");

	const periodoDepositoSelected = e.target.value;

	if ((valorMetaInput.value ** valorMetaInput.value > 0) && (valorDestinadoInput.value && valorDestinadoInput.value > 0)) {
		previewPeriodoDeposito(periodoDepositoSelected);
	}

	periodoDepositoPreview.innerText = periodoDepositoSelected;

	togglePeriodoDepositoDropdownButton();
}

function previewInputUpdate(e, metaInput) {
	let selectedInputMeta = e.target.getAttribute("data-input-meta");
	let selectedInputPreview = document.querySelector(`[data-input-meta-preview=${selectedInputMeta}]`);
	let metaInputValue = metaInput.value.trim();
	let periodoDepositoValue = periodoDepositoPreview.innerText;

	selectedInputPreview.innerText = metaInputValue;

	if (!metaInputValue) {
		selectedInputPreview.innerText = "------------";
	}

	if ((valorMetaInput.value && valorMetaInput.value > 0) && (valorDestinadoInput.value && valorDestinadoInput.value > 0) && periodoDepositoValue !== "Escolha o período") {
		previewPeriodoDeposito(periodoDepositoValue);
	} else {
		periodoDepositoInputPreview.innerText = "------------";
	}
}

periodoDepositoDropdownButton.addEventListener("click", togglePeriodoDepositoDropdownButton);

periodoDepositoInputs.forEach((input) => {
	input.addEventListener("click", (event) => {
		selectPeriodoDeposito(event);
	});
});

metaInputs.forEach((metaInput) => {
	metaInput.addEventListener("input", (event) => {
		previewInputUpdate(event, metaInput);
	});
});