
function removeUserListElem(obj) {
    obj.parentElement.remove(); // Remove the parent li element
}


const title = document.getElementById("title");
const comp_title = document.getElementById("componentTitle");

function syncComponentName() {
    comp_title.textContent = title.value;
}


const ingr = document.getElementById("ingredients");

function addIngredient() {
    ingr.insertAdjacentHTML("beforeend", '<li>' +
        '<input type="text" name="ingredient">' +
        '<button onclick="removeUserListElem(this)">X</button>' +
        '</li>');
}


const total_ingr = document.getElementById("ingredients_total");
const comp_sel = document.getElementById("components_selector");

function showSimpleLayout() {
    hideComplexRecipeLayout();
}

function showComplexLayout() {
    total_ingr.style.display = "";
    comp_sel.style.display = "";
}

function hideComplexRecipeLayout() {
    total_ingr.style.display = "none";
    comp_sel.style.display = "none";
}