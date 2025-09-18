<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { mdiDragHorizontalVariant } from '@mdi/js'
import { NewIngredient } from '../../types/Ingredient'
import { number } from 'zod'
import TestTable from './testTable.vue'

const list = defineModel<Array<NewIngredient>>('ingredient_list', { required: true })

const props = defineProps({
  parent_id: String,
  n_id: Number
})

const selected = []

const tableHeaders = [
  { text: '', value: 'draggable', width: '50px', sortable: false },
  { text: 'Ingredient', value: 'ingredient', sortable: false },
  { text: 'Units', value: 'units', sortable: false },
  { text: 'Measure', value: 'measure', sortable: false }
]

const id = props.parent_id + 'newIngredientList' + props.n_id

let counter = list.value.length

// Drag logic
const drag = ref(false)
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
    // TODO: Update to no position can be ''
    list.value.push(new NewIngredient({ name: '' }, counter++))
  }
}

function removeIngredient(dragId: number) {
  list.value = list.value.filter((ingredient) => {
    return ingredient.dragId !== dragId
  })
}
</script>

<template>
  <h1>Ingredients</h1>
  <!--<draggable
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
    item-key="dragId"
    :group="id"
  >
    <template #item="{ element }">
      <li class="list-group-item">
        <input type="text" placeholder="Ingredients" v-model="element.name" />
        <span>: </span>
        <input type="number" placeholder="unitats* (opcional)" v-model="element.units" />
        <input type="text" placeholder="mesura** (opcional)" v-model="element.measure" />
        <button @click="removeIngredient(element.dragId)">X</button>
        {{ element }}
      </li>
    </template>
  </draggable>-->
  <button @click="addIngredient">Add ingredient</button>

  <v-data-table
    ref="ingredientTable"
    v-model="selected"
    :headers="tableHeaders"
    :items="list"
    item-key="dragId"
    class="elevation-1"
  >
    <template #tbody="props">
      <draggable
        :list="list"
        :component-data="{
          tag: 'tbody',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }"
        v-model="list"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="dragId"
        :group="id"
      >
        <template #item="{ element }">
          <tr class="list-group-item">
            <td><v-input type="text" placeholder="Ingredients" v-model="element.name" /></td>
            <td>
              <input type="number" placeholder="unitats* (opcional)" v-model="element.units" />
            </td>
            <td>
              <input type="text" placeholder="mesura** (opcional)" v-model="element.measure" />
            </td>
            <td><button @click="removeIngredient(element.dragId)">X</button></td>
          </tr>
        </template>
      </draggable>
    </template>
  </v-data-table>
  <p>hello?</p>

  <TestTable></TestTable>
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

.bold {
  font-weight: bold;
}

.handle {
}

.slide {
  scroll-snap-align: start;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #999;
}
</style>
