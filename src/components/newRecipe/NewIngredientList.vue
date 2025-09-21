<script async setup lang="ts">
import { dbLit } from '@/literals'
import type { DBConnection } from '@/services/database/dbInterface'
import draggable from 'vuedraggable'
import { ref, computed, inject } from 'vue'
import type { Ref } from 'vue'
import { mdiDragHorizontalVariant, mdiClose } from '@mdi/js'
import { NewIngredient } from '../../types/Ingredient'
import { number } from 'zod'
import TestTable from './testTable.vue'
import type { DataTableHeader } from 'vuetify'

const ingredientList = defineModel<Array<NewIngredient>>('ingredient_list', { required: true })

const props = defineProps({
  parent_id: String,
  n_id: Number
})

const tableHeaders = [
  { value: 'dragHandle', width: '50px', sortable: false },
  { title: 'Ingredient', value: 'ingredient', sortable: false },
  { title: 'Units', value: 'units', sortable: false },
  { title: 'Measure', value: 'measure', sortable: false },
  { title: 'deleteRow', width: '50px', sortable: false }
] as DataTableHeader[]

let counter = ingredientList.value.length

if (!ingredientList.value.length) {
  addIngredient()
}

const id = props.parent_id + 'newIngredientList' + props.n_id

const db: Ref<DBConnection> = inject(dbLit) as Ref<DBConnection>
await db.value.waitForConnection()
const allIngredients = await db.value.getAllIngredients()
//const allIngredients = ['tomatoe', 'potatoe', 'carrot', 'letuce', 'egg']

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
  if (
    ingredientList.value.length === 0 ||
    ingredientList.value[ingredientList.value.length - 1].name !== ''
  ) {
    ingredientList.value.push(new NewIngredient(counter++))
  }
}

function removeIngredient(dragId: number) {
  ingredientList.value.splice(
    ingredientList.value.findIndex((i) => i.dragId === dragId),
    1
  )
}

let getClass = (idx: number) => {
  return idx % 2 ? 'cal-high' : 'cal-low'
}
</script>

<template>
  <h1>Ingredients</h1>
  <v-data-table
    ref="myTable"
    :headers="tableHeaders"
    :items="ingredientList"
    item-key="name"
    class="elevation-1"
    items-per-page="-1"
    hide-default-header
    hide-default-body
    hide-default-footer
  >
    <template #tbody="{ items }">
      <draggable
        :list="ingredientList"
        tag="tbody"
        :component-data="{
          tag: 'tbody',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="name"
        handle=".handle"
      >
        <template #item="{ element }">
          <tr :class="getClass">
            <td :key="0">
              <v-icon
                :icon="mdiDragHorizontalVariant"
                role="img"
                aria-hidden="false"
                :class="'handle'"
              />
            </td>

            <td :key="1">
              <v-combobox
                type="text"
                label="Ingredient"
                placeholder="tomato"
                hint="Input only the name of the ingredient"
                :items="allIngredients"
                v-model="element.name"
              />
            </td>

            <td :key="2">
              <v-text-field
                type="number"
                label="Units"
                placeholder="0"
                v-model="element.units"
                clearable
              ></v-text-field>
            </td>

            <td :key="3">
              <v-text-field
                type="text"
                label="Measure"
                placeholder="kg, g, l, ..."
                hint="Try to keep it as standarized as possible"
                v-model="element.measure"
                clearable
              />
            </td>

            <td :key="4">
              <v-icon
                :icon="mdiClose"
                role="img"
                aria-hidden="false"
                @click="removeIngredient(element.dragId)"
              />
            </td>
          </tr>
        </template>
      </draggable>
    </template>
  </v-data-table>

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
