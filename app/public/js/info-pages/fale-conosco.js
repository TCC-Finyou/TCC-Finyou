function loadInitialPage() {
    if (document.querySelector("[data-duvidas-input]")) {
        const duvidaInput = document.querySelector("[data-duvidas-input]");
        const chacterLimitContainer = document.querySelector("[data-character-limit]");
        const actualCharacterNumberContainer = document.querySelector("[data-actual-character-number]");

        const duvidaInputInitial = duvidaInput.value.length;
        actualCharacterNumberContainer.innerText = duvidaInputInitial;

        duvidaInput.addEventListener("keyup", () => {
            let actualCharacterNumber = duvidaInput.value.length;
            actualCharacterNumberContainer.innerText = actualCharacterNumber;

            if (actualCharacterNumber === 500) {
                chacterLimitContainer.classList.add("max");
            } else if (actualCharacterNumber < 500 && chacterLimitContainer.classList.contains("max")) {
                chacterLimitContainer.classList.remove("max");
            }
        })
    }
}

window.addEventListener("load", loadInitialPage);