<script setup lang="ts">
import NewIngredientList from './NewIngredientList.vue'
import AddMedia from '../media/AddMedia.vue'
import NewDirection from './NewDirection.vue'
import type { NewRecipeType } from '../../types/NewRecipe'
import type { Ref } from 'vue'
import { ref, computed } from 'vue'

let parent_id = 'newRecipe'

const props = defineProps<{
  newRecipe: NewRecipeType
}>()

let newRecipe: Ref<NewRecipeType> = ref(props.newRecipe)
/*let newRecipe: Ref<NewRecipe> = ref(
  new NewRecipe({
    title: '',
    media: [],
    category: [''], // Currently hardcoding a single value to keep it simple
    tags: [''], // Currently hardcoding a single value to keep it simple
    recipeYield: -1,
    prepTime: '',
    cookTime: '',
    tools: [''], // Currently hardcoding a single value to keep it simple
    difficulty: 0,
    ingredients: [],
    direction: [],
    components: []
  })
)*/

const composedRecipe = computed(() => {
  if (newRecipe.value.components.length > 0) {
    return true
  }
  return false
})

const totalIngredients = computed(() => {
  if (composedRecipe.value) {

  }
})
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
    <input type="text" id="tools" name="tools" v-model="newRecipe.tools[0]" />
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
      <NewDirection :parent_id="parent_id" :n_id="2" :direction_list="newRecipe.direction" />
    </div>
  </div>

  <button onclick="">Save recipe</button>

  <p style="color: black">{{ JSON.stringify(newRecipe.ingredients) }}</p>
</template>
