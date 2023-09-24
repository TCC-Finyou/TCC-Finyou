const openDeleteTagPopUpButtons = document.querySelectorAll("[data-open-delete-tag-pop-up]");
const deleteTagPopUpContainer = document.querySelector("[data-delete-tag-pop-up-container]");
const closeDeleteTagPopUpButton = document.querySelector("[data-close-delete-tag-pop-up]");
const deleteTagButton = document.querySelector("[data-delete-tag-button]");

function openDeleteTagPopUp(event) {
	let selectedTagId = event.currentTarget.getAttribute("data-open-delete-tag-pop-up");

	deleteTagPopUpContainer.classList.add("ativo");
	deleteTagPopUpContainer.setAttribute("tabindex", "0");
	deleteTagButton.setAttribute("data-delete-tag-button", selectedTagId);
}

function closeDeleteTagPopUp() {
	deleteTagPopUpContainer.classList.remove("ativo");
	deleteTagPopUpContainer.setAttribute("tabindex", "-1");
}

function deleteTag(event) {
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
			closeDeleteTagPopUp();
		});
}

openDeleteTagPopUpButtons.forEach((openDeleteTagPopUpButton) => {
	openDeleteTagPopUpButton.addEventListener("click", (event) => {
		openDeleteTagPopUp(event);
	});
});

deleteTagPopUpContainer.addEventListener("click", (event) => {
	if (event.target.id === "delete-tag-pop-up-container") {
		closeDeleteTagPopUp();
	}
});

closeDeleteTagPopUpButton.addEventListener("click", closeDeleteTagPopUp);

deleteTagButton.addEventListener("click", (event) => {
    deleteTag(event);
});

// ! Criar rota para deletar a tag com um fetch
// ! Adicionar pop-up para confirmar deletar a tag
