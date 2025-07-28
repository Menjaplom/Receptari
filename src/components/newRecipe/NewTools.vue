<script setup lang="ts">
import draggable from 'vuedraggable'
import { dbLit } from '@/literals';
import type { DBConnection } from '@/services/database/dbInterface';
import { NewTool } from '@/types/Tool';
import { computed, inject, ref, type Ref } from 'vue';
import TagComp from '../tag/TagComp.vue';
import AutoComplete from '../misc/AutoComplete.vue';

const props = defineProps({
  parent_id: String,
  n_id: Number
})
const id = props.parent_id + 'newToolList' + props.n_id

let newTools = defineModel<Array<NewTool>>('tool_list', { required: true })
let counter = newTools.value.length

const db: Ref<DBConnection> = inject(dbLit) as Ref<DBConnection>
const toolSugestionList = await db.value.getAllTools()



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
  if (newTools.value.length === 0 || newTools.value[newTools.value.length - 1].name !== '') {
    // TODO: Update to no position can be ''
    newTools.value.push(new NewTool({name: '' }, counter++))
  }
}

function removeTool(dragId: number) {
  newTools.value = newTools.value.filter((tool) => {
    return tool.dragId !== dragId
  })
}
</script>

<template>
  <draggable
    class="list-group"
    tag="ul"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null
    }"
    v-model="newTools"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
    item-key="dragId"
    :group="id"
  >
    <template #item="{ element }">
      <li class="list-group-item">
        <input type="text" placeholder="Tool" v-model="element.name" />
        <span>: </span>
        <input type="text" placeholder="description* (optional)" v-model="element.description" />
        <button @click="removeTool(element.dragId)">X</button>
        {{ element }}
      </li>
    </template>
  </draggable>
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
