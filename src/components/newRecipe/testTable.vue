<script setup lang="ts">
import draggable from 'vuedraggable'
import { computed, ref } from 'vue'
import DataTableRowHandler from './DataTableRowHandler.vue'
import { mdiDragHorizontalVariant } from '@mdi/js'

const allowDrag = ref(true)
const selected = ref(
  [] as {
    name: string
    calories: number
    fat: number
    carbs: number
    protein: number
    iron: string
    locked: boolean
  }[]
)
const headers = ref([
  { text: '', value: 'handle', width: '50px', sortable: false },
  {
    text: 'Dessert (100g serving)',
    align: 'start',
    sortable: false,
    value: 'name'
  },
  { text: 'Calories', value: 'calories' },
  { text: 'Fat (g)', value: 'fat' },
  { text: 'Carbs (g)', value: 'carbs' },
  { text: 'Protein (g)', value: 'protein' },
  { text: 'Iron (%)', value: 'iron' }
] as {
  text: string
  value: string
  width: string
  sortable: boolean
  align?: 'start' | 'end' | 'center' | undefined
}[])

let desserts = ref([
  {
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    iron: '1%',
    locked: false
  },
  {
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    iron: '1%',
    locked: true
  },
  {
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    iron: '7%',
    locked: false
  },
  {
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    iron: '8%',
    locked: false
  },
  {
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    iron: '16%',
    locked: false
  },
  {
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    iron: '0%',
    locked: false
  },
  {
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    iron: '2%',
    locked: false
  },
  {
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    iron: '45%',
    locked: false
  },
  {
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    iron: '22%',
    locked: true
  },
  {
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    iron: '6%',
    locked: false
  }
] as {
  name: string
  calories: number
  fat: number
  carbs: number
  protein: number
  iron: string
  locked: boolean
}[])

const activeHeaders = computed(() => {
  return headers.value.filter((h) => allowDrag.value || h.value !== 'lock')
})

let getClass = (item) => {
  return item.calories > 500 ? 'cal-high' : item.calories > 400 ? 'cal-medium' : 'cal-low'
}
let onCloneCallback = (item) => {
  // Create a fresh copy of item
  const cloneMe = JSON.parse(JSON.stringify(item))

  return cloneMe
}
let onMoveCallback = (evt, originalEvent) => {
  const item = evt.draggedContext.element
  const itemIdx = evt.draggedContext.futureIndex

  console.log('onMoveCallback')

  if (item.locked) {
    return false
  }

  return true
}

// Draggable logic
const drag = ref(false)
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'hidden'
  }
})
</script>

<template>
  <div>
    <v-switch v-model="allowDrag" label="Draggable"> </v-switch>
    <v-data-table
      ref="myTable"
      v-model="selected"
      :headers="activeHeaders"
      :items="desserts"
      item-key="name"
      class="elevation-1"
      hide-default-body
    >
      <template #tbody="{ items }">
        <draggable
          :list="desserts"
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
          <template #item="{ element, idx }">
            <DataTableRowHandler
              :key="idx"
              :item="element"
              :headers="activeHeaders"
              :item-class="getClass(element)"
            >
              <template #item.handle="{ item }">
                <v-icon
                  :icon="mdiDragHorizontalVariant"
                  role="img"
                  aria-hidden="false"
                  :class="'handle'"
                />
              </template>
              <template #item.carbs="{ item }">
                <v-icon>{{
                  item.carbs > 80
                    ? 'mdi-speedometer'
                    : item.carbs > 45
                      ? 'mdi-speedometer-medium'
                      : 'mdi-speedometer-slow'
                }}</v-icon>
              </template>
            </DataTableRowHandler>
          </template>
        </draggable>
      </template>
    </v-data-table>
    <p>{{ desserts }}</p>
  </div>
</template>

<style>
.cal-high {
  background-color: hotpink;
}
.cal-medium {
  background-color: lightpink;
}
.cal-low {
  background-color: lightgoldenrodyellow;
}

.handle {
}
</style>
