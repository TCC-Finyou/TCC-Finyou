function updateCharacterActualNumber(input, actualCharacterNumberContainer, characterNumberContainer) {
	let actualCharacterNumber = input.value.length;
	actualCharacterNumberContainer.innerText = actualCharacterNumber;

	if (actualCharacterNumber === 500) {
		characterNumberContainer.classList.add("max");
	} else if (actualCharacterNumber < 500 && characterNumberContainer.classList.contains("max")) {
		characterNumberContainer.classList.remove("max");
	}
}

function loadInitialPage() {
	const duvidaInput = document.querySelector("[data-duvidas-input]");
	const chacterLimitContainer = document.querySelector("[data-character-limit]");
	const actualCharacterNumberContainer = document.querySelector("[data-actual-character-number]");

	updateCharacterActualNumber(duvidaInput, actualCharacterNumberContainer, chacterLimitContainer);

	duvidaInput.addEventListener("keyup", () => {
		updateCharacterActualNumber(duvidaInput, actualCharacterNumberContainer, chacterLimitContainer);
	});
}
if (document.querySelector("[data-duvidas-input]")) {
	window.addEventListener("load", loadInitialPage);
}
