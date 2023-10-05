const openDeleteMetaPopUpButtons = document.querySelectorAll("[data-open-delete-tag-pop-up]");
const deleteMetaPopUpContainer = document.querySelector("[data-delete-tag-pop-up-container]");
const closeDeleteMetaPopUpButton = document.querySelector("[data-close-delete-tag-pop-up]");
const deleteMetaButton = document.querySelector("[data-delete-tag-button]");

function openDeleteMetaPopUp(event) {
	let selectedTagId = event.currentTarget.getAttribute("data-open-delete-tag-pop-up");

	deleteMetaPopUpContainer.classList.add("ativo");
	deleteMetaPopUpContainer.setAttribute("tabindex", "0");
	deleteMetaButton.setAttribute("data-delete-tag-button", selectedTagId);
}

function closeDeleteMetaPopUp() {
	deleteMetaPopUpContainer.classList.remove("ativo");
	deleteMetaPopUpContainer.setAttribute("tabindex", "-1");
}

function deleteMeta(event) {
	let tagId = event.target.getAttribute("data-delete-tag-button");
	let selectedTag = document.querySelector(`[data-open-delete-tag-pop-up="${tagId}"]`);

	fetch(`deletar-tag/${tagId}`, {
		method: "POST",
		headers: new Headers(),
		mode: "cors",
		cache: "default",
	})
		.then(() => {
			selectedTag.parentElement.remove();
		})
		.catch(() => {
			return;
		})
		.finally(() => {
			closeDeleteMetaPopUp();
		});
}

openDeleteMetaPopUpButtons.forEach((openDeleteTagPopUpButton) => {
	openDeleteTagPopUpButton.addEventListener("click", (event) => {
		openDeleteMetaPopUp(event);
	});
});

deleteMetaPopUpContainer.addEventListener("click", (event) => {
	if (event.target.id === "delete-tag-pop-up-container") {
		closeDeleteMetaPopUp();
	}
});

closeDeleteMetaPopUpButton.addEventListener("click", closeDeleteMetaPopUp);

deleteMetaButton.addEventListener("click", (event) => {
    deleteMeta(event);
});