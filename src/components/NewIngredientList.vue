<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import Ingredient from '../types/Ingredient'
import NewIngredient from './NewIngredient.vue'

let ingredients: Array<Ingredient> = [
  { name: 'ou' },
  { name: 'sal', units: 1, measure: 'pensament' }
]

const drag = ref(false)
const list = ref(
  ingredients.map((ingredient, index) => {
    return { ingredient, order: index + 1 }
  })
)
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost'
  }
})
</script>

<template>
  <h1>Ingredients</h1>
  <draggable
    class="list-group"
    tag="ul"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null
    }"
    v-model="list"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
    item-key="order"
  >
    <template #item="{ element }">
      <li class="list-group-item">
        <NewIngredient :ingredient="element.ingredient" />
        {{ element.ingredient }}
      </li>
    </template>
  </draggable>
</template>

<style>
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.2; /*0.5;*/
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>
