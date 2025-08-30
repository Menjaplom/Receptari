<script setup lang="ts">
import NewIngredientList from './NewIngredientList.vue'
import UpdateDirection from './UpdateDirection.vue'
import SavePopup from './SavePopup.vue'
import type { Ref } from 'vue'
import { ref, computed, inject } from 'vue'
import { emptyRecipe, NewRecipe, type Recipe } from '@/types/Recipe'
import type { DBConnection } from '@/services/database/dbInterface'
import { dbLit } from '@/literals'
import router from '@/router'
import { HSLToHexStr, newHSLPastel } from '@/utils/colors'
import TagComp from '../tag/TagComp.vue'
import NewTags from './NewTags.vue'
import NewTools from './NewTools.vue'
import RecipeWrapper from '../misc/RecipeWrapper.vue'
import AddMedia from '../media/AddMedia.vue'
//import { Octokit } from 'https://esm.sh/@octokit/core@4.2.2'

const parent_id = 'newRecipe' // FIXME: HARDCODED VALUE!!

const props = defineProps<{
  recipe: Recipe | null
}>()
const db: Ref<DBConnection> = inject(dbLit) as Ref<DBConnection>
//let test_recipe: Recipe = props.recipe
let newRecipe: Ref<NewRecipe> = ref(new NewRecipe(props.recipe?? emptyRecipe))
/*fetch('/static/recipes/braç_de_gitano_de_crema/Braç_de_gitano_de_crema.json')
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    test_recipe = recipeSchema.parse(data)
    console.log(test_recipe)
    recipe.value = new recipe(test_recipe)
  })
  .catch((error) => console.error('Error loading JSON file', error))*/

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

async function saveRecipe() {
  /*const octokit = new Octokit({ auth: localStorage.getItem('tokenReceptari') })
  const user: string = inject(usernameLit) as string
  const repo: string = inject(repoLit) as string
  const branch: string = inject(branchLit) as string

  let saveRecipe = JSON.stringify(recipe.value.outputRecipe())*/
  let recipeComputed: Recipe = newRecipe.value.exportRecipe()
  console.log('recipe to be saved' + JSON.stringify(recipeComputed))
  db.value.addRecipe(recipeComputed).then((thumbnail) => {
    console.log('Redirecting to Main page...')
    setTimeout(() => router.replace({path: '/', }), 100);
  })

}

function required (v) {
  return !!v || 'Field is required'
}

</script>

<template>
  <RecipeWrapper :isExpandable="recipe !== null">
    <h2>New Recipe</h2>
    <div>
      <h3>Nom de la recepta</h3>
      <v-text-field v-model="newRecipe.title" placeholder="Title" hint="Es mostrarà a la pàgina d'inici" :rules="[required]" clearable></v-text-field>
    </div>
    
    <div>
      <h3>Multimedia de la recepta</h3>
      <AddMedia v-model:new_media_list="newRecipe.media" :parent_id="`${newRecipe.id}_`" :n_id="0"/>
    </div>

    <div>
      <h3>Description</h3>
      <input type="text" id="title" name="title" v-model="newRecipe.title" />
    </div>  

    <div>
      <h3>Categories</h3>
      <input type="text" id="categories" name="categories" v-model="newRecipe.category[0]" />
    </div>

    <div>
      <h3>Tags</h3>
      <!--<NewTags v-model:new-tags="newRecipe.tags" />-->
    </div>

    <div>
      <h3>Recipe yield</h3>
      <input type="number" id="yield_units" name="yield_units" v-model="newRecipe.yield.units" />
      <input type="text" id="yield_measure" name="yield_measure" v-model="newRecipe.yield.measure" />
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
      <input type="number" id="difficulty" name="difficulty" v-model="newRecipe.difficulty" />
    </div>

    <div>
      <h3>Tools</h3>
      <NewTools :parent_id="parent_id"
            :n_id="0"
            :tool_list="newRecipe.tools" />
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
        <UpdateDirection :parent_id="parent_id" :n_id="2" v-model:direction_list="newRecipe.directions"/>
      </div>
    </div>

    <button @click="(savePopped = true)">Save recipe</button>
    <SavePopup v-model:visible="savePopped" @run-process="saveRecipe" />

    <p style="color: black">{{ JSON.stringify(newRecipe.ingredients) }}</p>
  </RecipeWrapper>
</template>
