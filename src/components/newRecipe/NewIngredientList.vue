<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import Ingredient from '../../types/Ingredient'
import NewIngredient from './NewIngredient.vue'

const props = defineProps({
  list_id: String
})
let order_counter = -1 // must be -1 to begin with

const drag = ref(false)
const list: Ref<Array<Ingredient>> = ref([])
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost'
  }
})

function addIngredient() {
  if (list.value.length === 0 || list.value[list.value.length - 1].name !== '') {
    list.value.push(new Ingredient(++order_counter, ''))
  }
}

function removeIngredient(key: number) {
  list.value = list.value.filter((ingredient) => {
    return ingredient.key !== key
  })
}
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
    item-key="key"
    group="adeu"
  >
    <template #item="{ element }">
      <li class="list-group-item">
        <NewIngredient
          v-model:name="element.name"
          v-model:units="element.units"
          v-model:measure="element.measure"
        />
        <button @click="removeIngredient(element.key)">X</button>
        {{ element }}
      </li>
    </template>
  </draggable>
  <button @click="addIngredient">Add ingredient</button>
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
