const periodoDepositoDropdownButton = document.querySelector("[data-periodo-deposito-dropdown-button]");

const periodoDepositoInputs = document.querySelectorAll("[data-periodo-deposito-input]");
const periodoDepositoSelected = document.querySelector("[data-periodo-deposito-selected]");

const imagemMetaInput = document.querySelector("[data-imagem-meta-input]");
const imagemMetaPreview = document.querySelector("[data-imagem-meta-preview]");

imagemMetaInput.addEventListener("change", () => {
	const selectedFile = imagemMetaInput.files[0];

	if (selectedFile) {
		const imageUrl = URL.createObjectURL(selectedFile);
		const imageElement = document.createElement("img");
		imageElement.src = imageUrl;

		imagemMetaPreview.innerHTML = "";
		imagemMetaPreview.appendChild(imageElement);
	}
});

periodoDepositoDropdownButton.addEventListener("click", () => {
	periodoDepositoDropdownButton.classList.toggle("ativo");
});

periodoDepositoInputs.forEach((input) => {
	input.addEventListener("click", (e) => {
		const parentSelected = e.target.parentNode;
		const parentContainer = e.target.parentNode.parentNode;
		const parentContainerChildren = parentContainer.children;

		for (const child of parentContainerChildren) {
			child.classList.remove("ativo");
		}

		parentSelected.classList.add("ativo");

		const valueSelected = e.target.value;
		const firstLetterCapitalized = valueSelected.charAt(0).toUpperCase();
		const remaingLetters = valueSelected.slice(1);
		const capitalizedValue = firstLetterCapitalized + remaingLetters;

		periodoDepositoSelected.innerText = capitalizedValue;

		periodoDepositoDropdownButton.classList.toggle("ativo");
	});
});
