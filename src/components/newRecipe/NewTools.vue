<script setup lang="ts">
import draggable from 'vuedraggable'
import { dbLit } from '@/literals'
import type { DBConnection } from '@/services/database/dbInterface'
import { NewTool } from '@/types/Tool'
import { computed, inject, ref, type Ref } from 'vue'
import { mdiDragHorizontalVariant, mdiClose } from '@mdi/js'

const props = defineProps({
  parent_id: String,
  n_id: Number
})
const id = props.parent_id + 'newToolList' + props.n_id

let newTools = defineModel<Array<NewTool>>('tool_list', { required: true })
let counter = newTools.value.length

if (!newTools.value.length) {
  addTool()
}

const db: Ref<DBConnection> = inject(dbLit) as Ref<DBConnection>
await db.value.waitForConnection()
const toolSugestionList = ['tomatoe', 'potatoe', 'carrot', 'letuce', 'egg']
//const toolSugestionList = await db.value.getAllTools()

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

function addTool() {
  if (
    newTools.value.length === 0 ||
    newTools.value.every((tool) => tool.name && tool.name !== '')
  ) {
    newTools.value.push(new NewTool({ name: '' }, counter++))
  }
}

function removeTool(dragId: number) {
  newTools.value.splice(
    newTools.value.findIndex((t) => t.dragId === dragId),
    1
  )
}

let getClass = (idx: number) => {
  return idx % 2 ? 'cal-high' : 'cal-low'
}
</script>

<template>
  <v-data-table
    ref="myTable"
    :items="newTools"
    item-key="name"
    class="elevation-1"
    items-per-page="-1"
    hide-default-header
    hide-default-body
    hide-default-footer
  >
    <template #tbody="{ items }">
      <draggable
        :list="newTools"
        tag="tbody"
        :component-data="{
          tag: 'tbody',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="dragId"
        handle=".handle"
        :group="id"
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
                label="Tool"
                placeholder="Cake mold"
                hint="Dont be too specific naming the tool"
                :items="toolSugestionList"
                v-model="element.name"
              />
            </td>

            <td :key="2">
              <v-text-field
                type="number"
                label="Units"
                placeholder="1"
                v-model="element.units"
                clearable
              />
            </td>

            <td :key="3">
              <v-text-field
                type="text"
                label="Description"
                placeholder="20 cm"
                hint="Be as specific as possible"
                v-model="element.description"
                clearable
              />
            </td>

            <td :key="4">
              <v-icon
                :icon="mdiClose"
                role="img"
                aria-hidden="false"
                @click="removeTool(element.dragId)"
              />
            </td>
          </tr>
        </template>
      </draggable>
    </template>
  </v-data-table>
  <p>{{ newTools }}</p>
  <button @click="addTool">Add tool</button>
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
