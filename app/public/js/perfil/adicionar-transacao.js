const tagDropdownButton = document.querySelector("[data-tag-dropdown-button]");

const tagInputs = document.querySelectorAll("[data-tag-input]");
const tagPreview = document.querySelector("[data-tag-selected]");

function toggletagDropdownButton() {
	tagDropdownButton.classList.toggle("ativo");
}

function selectTag(e) {
	const parentSelected = e.target.parentNode;
	const parentContainer = e.target.parentNode.parentNode;
	const parentContainerChildren = parentContainer.children;

	for (const child of parentContainerChildren) {
		child.classList.remove("ativo");
	}

	parentSelected.classList.add("ativo");

	const tagSelected = e.target.parentElement.innerText;

	tagPreview.innerText = tagSelected;

	toggletagDropdownButton();
}

tagDropdownButton.addEventListener("click", toggletagDropdownButton);

tagInputs.forEach((input) => {
	input.addEventListener("click", (event) => {
		selectTag(event);
	});
});