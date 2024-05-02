const template = document.createElement('template');
template.innerHTML = `
    <style>
    
    </style>

    <li>
        <input type="text" placeholder="Ingredients">
        <span>: </span>
        <input type="text" placeholder="unitats* mesura** (opcional)">
        <button onclick="removeIngredient(this)">X</button>
    </li>
`;

class EditableIngredient extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

function removeIngredient(obj) {
    obj.parentElement.remove(); // Remove the parent li element
}

window.customElements.define('editable-ingredient', EditableIngredient);