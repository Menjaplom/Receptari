<script setup lang="ts">
import NewIngredientList from './NewIngredientList.vue'
import AddMedia from '../media/AddMedia.vue'
</script>

<template>
  <h2>New Recipe</h2>
  <div>
    <h3>Nom de la recepta</h3>
    <input type="text" id="title" name="title" onblur="syncComponentName()" />
  </div>

  <img src="" alt="" id="main_image" />
  <div>
    <h3>Tipus de recepta</h3>
    <input type="radio" id="simple" name="recipe_type" onclick="showSimpleLayout()" checked />
    <label for="simple">Senzilla</label>
    <input type="radio" id="compound" name="recipe_type" onclick="showComplexLayout()" />
    <label for="compound">Composta</label>
  </div>

  <div id="components_selector" style="display: none">
    <h3>Sel·lecciona els components:</h3>
    <input type="text" id="components_selector_value" list="component_search" />
    <datalist id="component_search">
      <option value="Boston"></option>
      <option value="Cambridge"></option>
      <option value="Crema pastissera"></option>
    </datalist>
    <button onclick="addComponent()">+</button>
    <div>
      <p>Components afegits:</p>
      <div id="components_added"></div>
    </div>
  </div>

  <div>
    <h3>Categories</h3>
    <input type="text" id="categories" name="categories" />
  </div>

  <div>
    <h3>Tags</h3>
    <input type="text" id="tags" name="tags" />
  </div>

  <div>
    <h3>Recipe yield</h3>
    <input type="text" id="recipe_yield" name="recipe_yield" />
  </div>

  <div>
    <h3>Preparation time</h3>
    <input type="text" id="prep_time" name="prep_time" />
  </div>

  <div>
    <h3>Cook time</h3>
    <input type="text" id="cook_time" name="cook_time" />
  </div>

  <div>
    <h3>Difficulty</h3>
    <input type="text" id="difficulty" name="difficulty" />
  </div>

  <div>
    <h3>Tools</h3>
    <input type="text" id="tools" name="tools" />
  </div>

  <div id="ingredients_total" style="display: none">
    <h3>Total d'ingredients</h3>
    <ul>
      <li>
        <span>Ingredient</span>
        <span>: </span>
        <span>quantity </span>
        <span>units</span>
      </li>
    </ul>
  </div>

  <div id="components" style="display: none">
    <!-- Reused components -->
    <div>
      <h2>Component 1</h2>
      <div>
        <h3>Ingredients</h3>
        <ul class="ingredients">
          <li>Ingredient 1</li>
        </ul>
      </div>

      <div>
        <h3>Directions</h3>
        <ul class="directions">
          <li>Direction 01</li>
        </ul>
      </div>
    </div>
  </div>

  <div>
    <!-- Main component -->
    <h2 id="componentTitle" style="display: none">New Recipe</h2>
    <div>
      <div>
        <h3>Ingredients</h3>
        <NewIngredientList :list_id="'ingredient_list'" />
      </div>
    </div>

    <div>
      <h3>Directions</h3>
      <ul class="directions">
        <li>Direction 01</li>
      </ul>
    </div>
  </div>

  <button onclick="">Save recipe</button>
  <AddMedia />
</template>
