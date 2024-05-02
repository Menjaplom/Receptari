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

/*function removeIngredient(obj) {
    obj.parentElement.remove(); // Remove the parent li element
}*/

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
let comp_sel_val = document.getElementById("components_selector_value");
const comp_added = document.getElementById("components_added");

function addComponent() {
    let val = comp_sel_val.value;
    comp_added.insertAdjacentHTML("beforeend", '<span>' +
        val +
        '</span>');
    loadRecipeJSONAsComponent(val);
}

// Load recipe JSON
function loadRecipeJSONAsComponent(recipe_name) {
    let path = "http://127.0.0.1:5500/recipes/" + recipe_name.trim().toLowerCase().replace(" ", "_") + ".json";
    console.log(path);
    fetch(path)
        .then((res) => {
            if (!res.ok) {
                throw new Error
                    (`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) =>
            console.log(data))
        .catch((error) =>
            console.error("Unable to fetch data:", error));
}