<script setup lang="ts">
import NewIngredientList from './NewIngredientList.vue'
import NewDirection from './NewDirection.vue'
import NewRecipe from '../../types/NewRecipe'
import SavePopup from './SavePopup.vue'
import type { Ref } from 'vue'
import { ref, computed, onMounted } from 'vue'
import { recipeSchema, type RecipeType } from '@/types/Recipe'

let parent_id = 'newRecipe'

const props = defineProps<{
  recipe: RecipeType
}>()

let test_recipe: RecipeType = props.recipe
let newRecipe: Ref<NewRecipe> = ref(new NewRecipe(props.recipe))
fetch('/static/recipes/braç_de_gitano_de_crema/Braç_de_gitano_de_crema.json')
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    test_recipe = recipeSchema.parse(data)
    console.log(test_recipe)
    newRecipe.value = new NewRecipe(test_recipe)
  })
  .catch((error) => console.error('Error loading JSON file', error))

let savePopped: Ref<boolean> = ref(false)

const composedRecipe = computed(() => {
  if (newRecipe.value.components.length > 0) {
    return true
  }
  return false
})

const debugDirections = computed(() => {
  alert('hello?')
  console.log(JSON.stringify(newRecipe.value.directions))
  return newRecipe.value.directions
})

function saveRecipe() {
  savePopped.value = true
  //let saveRecipe = { ...newRecipe.value.outputRecipe() }
  let saveRecipe = JSON.stringify(newRecipe.value.outputRecipe())
  console.log(saveRecipe)
}
</script>

<template>
  <h2>New Recipe</h2>
  <div>
    <h3>Nom de la recepta</h3>
    <input type="text" id="title" name="title" v-model="newRecipe.title" />
  </div>

  <img src="" alt="" id="main_image" />

  <div>
    <h3>Categories</h3>
    <input type="text" id="categories" name="categories" v-model="newRecipe.category[0]" />
  </div>

  <div>
    <h3>Tags</h3>
    <input type="text" id="tags" name="tags" v-model="newRecipe.tags[0]" />
  </div>

  <div>
    <h3>Recipe yield</h3>
    <input type="text" id="recipe_yield" name="recipe_yield" v-model="newRecipe.recipeYield" />
  </div>

  <div>
    <h3>Preparation time</h3>
    <input type="text" id="prep_time" name="prep_time" v-model="newRecipe.prepTime" />
  </div>

  <div>
    <h3>Cook time</h3>
    <input type="text" id="cook_time" name="cook_time" v-model="newRecipe.cookTime" />
  </div>

  <div>
    <h3>Difficulty</h3>
    <input type="text" id="difficulty" name="difficulty" v-model="newRecipe.difficulty" />
  </div>

  <div>
    <h3>Tools</h3>
    <input type="text" id="tools" name="tools" v-model="newRecipe.tools" />
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

  <div id="ingredients_main" style="display: none">
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
        <NewIngredientList
          :parent_id="parent_id"
          :n_id="0"
          :ingredient_list="newRecipe.ingredients"
        />
      </div>
    </div>

    <div>
      <h3>Directions</h3>
      <NewDirection :parent_id="parent_id" :n_id="2" :direction_list="newRecipe.directions" />
    </div>
  </div>

  <button @click="saveRecipe()">Save recipe</button>
  <SavePopup v-model:visible="savePopped" />

  <p style="color: black">{{ JSON.stringify(newRecipe.ingredients) }}</p>
</template>
