function addIngredient() {
    const elem = document.getElementById("ingredients");
    elem.insertAdjacentHTML("beforeend", '<li>' +
        '<input type="text" name="ingredient">' +
        '<button>X</button>' +
        '</li>');
}

function removeIngredient(ing_id) {
    const elem = document.getElementById("ingredients");
    elem.insertAdjacentHTML("beforeend", '<li>' +
        '<input type="text" name="ingredient">' +
        '<button>X</button>' +
        '</li>');
}