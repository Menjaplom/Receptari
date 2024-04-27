function holi() {
    console.log("holi");
}

// Sync recipe title with main component title
const title = document.getElementById("title");
const recipe_name = document.getElementById("componentTitle");

function syncComponentName() {
    recipe_name.textContent = title.value;
}

// Ingredients operations
const ingr = document.getElementById("ingredients");

function addIngredient() {
    ingr.insertAdjacentHTML("beforeend", '<li>' +
        '<input type="text" name="ingredient">' +
        '<button onclick="removeIngredient(this)">X</button>' +
        '</li>');
}

function removeIngredient(obj) {
    obj.parentElement.remove(); // Remove the parent li element
}

// Modify page layout
const total_ingr = document.getElementById("ingredients_total");
const comp_sel = document.getElementById("components_selector");

function showSimpleLayout() {
    hideComplexRecipeLayout();
}

function showComplexLayout() {
    total_ingr.style.display = "";
    comp_sel.style.display = "";
    recipe_name.style.display = "";
}

function hideComplexRecipeLayout() {
    total_ingr.style.display = "none";
    comp_sel.style.display = "none";
    recipe_name.style.display = "none";
}

// Components selector
const comp_sel_val = document.getElementById("components_selector_value");
const comp_added = document.getElementById("components_added");

function addComponent() {
    comp_added.insertAdjacentHTML("beforeend", '<span>' +
        comp_sel_val.value +
        '</span>');
}