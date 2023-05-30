const menuHamburguer = document.querySelector("[data-menu-hamburguer]");
const menu = document.querySelector("[data-menu]");

menuHamburguer.addEventListener("click", () => {
    menuHamburguer.classList.toggle("active");
    menu.classList.toggle("active");
})