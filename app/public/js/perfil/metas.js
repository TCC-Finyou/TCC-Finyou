const openDeleteMetaPopUpButtons = document.querySelectorAll("[data-open-delete-meta-pop-up]");
const deleteMetaPopUpContainer = document.querySelector("[data-delete-meta-pop-up-container]");
const closeDeleteMetaPopUpButton = document.querySelector("[data-close-delete-meta-pop-up]");
const deleteMetaButton = document.querySelector("[data-delete-meta-button]");

function openDeleteMetaPopUp(event) {
	let selectedMetaId = event.currentTarget.getAttribute("data-open-delete-meta-pop-up");

	deleteMetaPopUpContainer.classList.add("ativo");
	deleteMetaPopUpContainer.setAttribute("tabindex", "0");
	deleteMetaButton.setAttribute("data-delete-meta-button", selectedMetaId);
}

function closeDeleteMetaPopUp() {
	deleteMetaPopUpContainer.classList.remove("ativo");
	deleteMetaPopUpContainer.setAttribute("tabindex", "-1");
}

function deleteMeta(event) {
	let metaId = event.target.getAttribute("data-delete-meta-button");
	let selectedMeta = document.querySelector(`[data-open-delete-meta-pop-up="${metaId}"]`);

	fetch(`deletar-meta/${metaId}`, {
		method: "POST",
		headers: new Headers(),
		mode: "cors",
		cache: "default",
	})
		.then(() => {
			selectedMeta.parentElement.remove();
		})
		.catch(() => {
			return;
		})
		.finally(() => {
			closeDeleteMetaPopUp();
		});
}

openDeleteMetaPopUpButtons.forEach((openDeleteMetaPopUpButton) => {
	openDeleteMetaPopUpButton.addEventListener("click", (event) => {
		openDeleteMetaPopUp(event);
	});
});

deleteMetaPopUpContainer.addEventListener("click", (event) => {
	if (event.target.id === "delete-meta-pop-up-container") {
		closeDeleteMetaPopUp();
	}
});

closeDeleteMetaPopUpButton.addEventListener("click", closeDeleteMetaPopUp);

deleteMetaButton.addEventListener("click", (event) => {
    deleteMeta(event);
});