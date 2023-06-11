const duvidasInput = document.querySelector("[data-duvidas-input]");
const chacterLimitContainer = document.querySelector("[data-character-limit]");
const actualCharacterNumberContainer = document.querySelector("[data-actual-character-number]");

duvidasInput.addEventListener("keyup", () => {
    let actualCharacterNumber = duvidasInput.value.length;
    actualCharacterNumberContainer.innerText = actualCharacterNumber;

    if (actualCharacterNumber === 500) {
        chacterLimitContainer.classList.add("max");
    } else if (actualCharacterNumber < 500 && chacterLimitContainer.classList.contains("max")) {
        chacterLimitContainer.classList.remove("max");
    }
})