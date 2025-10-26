<script setup lang="ts">
import type { NewRecipe } from '@/types/Recipe'
import NewTools from './NewTools.vue'
import NewIngredientList from './NewIngredientList.vue'
import UpdateDirection from './UpdateDirection.vue'

let newRecipe = defineModel<NewRecipe>('newRecipe', { required: true })
const props = defineProps({
  id: String
})

const parent_id = props.id
</script>

<template>
  <div>
    <h3>Tools</h3>
    <NewTools :parent_id="parent_id" :n_id="0" :tool_list="newRecipe.tools" />
  </div>

  <div>
    <h3>Ingredients</h3>
    <NewIngredientList :parent_id="parent_id" :n_id="0" :ingredient_list="newRecipe.ingredients" />
  </div>

  <div>
    <h3>Directions</h3>
    <UpdateDirection
      :parent_id="parent_id"
      :n_id="2"
      v-model:direction_list="newRecipe.directions"
    />
  </div>
</template>
