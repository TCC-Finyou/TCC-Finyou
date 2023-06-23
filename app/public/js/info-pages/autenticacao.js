const showPasswordBtn = document.querySelector("[data-show-password]");
const hidePasswordBtn = document.querySelector("[data-hide-password]");
const passwordInput = document.getElementById("senha");

showPasswordBtn.addEventListener("click", () => {
    togglePasswordView(showPasswordBtn, hidePasswordBtn, "text");
});

hidePasswordBtn.addEventListener("click", () => {
    togglePasswordView(hidePasswordBtn, showPasswordBtn, "password");
});

function togglePasswordView(hideBtn, showBtn, inputType) {
    hideBtn.classList.add("hide");
    showBtn.classList.remove("hide");

    passwordInput.setAttribute("type", inputType);
}