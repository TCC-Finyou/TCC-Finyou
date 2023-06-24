const showPasswordBtns = document.querySelectorAll("[data-show-password]");
const hidePasswordBtns = document.querySelectorAll("[data-hide-password]");

showPasswordBtns.forEach(showBtn => {
    showBtn.addEventListener("click", (e) => {
        const showBtnSelected = e.target;
        const hideBtnSelected = e.target.nextElementSibling;

        togglePasswordView(showBtnSelected, hideBtnSelected, "text");
    })
})

hidePasswordBtns.forEach(hideBtn => {
    hideBtn.addEventListener("click", (e) => {
        const showBtnSelected = e.target.previousElementSibling;
        const hideBtnSelected = e.target;

        togglePasswordView(hideBtnSelected, showBtnSelected, "password");
    })
})

function togglePasswordView(hideBtn, showBtn, inputType) {
    hideBtn.classList.add("hide");
    showBtn.classList.remove("hide");

    const passwordInput = hideBtn.parentElement.firstElementChild;

    passwordInput.setAttribute("type", inputType);
}