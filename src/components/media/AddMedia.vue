<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import MediaCarrousel from './MediaCarrousel.vue'
import { type NewMediaDataType } from '../../types/NewMediaData'

const props = defineProps({
  parent_id: String,
  n_id: Number
})
const list = defineModel<Array<NewMediaDataType>>('media_list', { default: [] })

const id = props.parent_id + 'addMedia' + props.n_id

// Draggable logic
const drag = ref(false)
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost'
  }
})
// Carrousel input logic
let selected = ref(0)
const media_urls = computed(() => {
  return (
    list.value?.map((m) => {
      return m.url
    }) || []
  )
})

function removeFile(order: number) {
  for (let i = 0; i < (list.value.length || 0); ++i) {
    if ((list.value[i].order || -1) === order) {
      list.value.splice(i, 1)
      if (i <= selected.value && selected.value !== 0) selected.value -= 1
      break
    }
  }
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
    v-model="list"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
    item-key="order"
    :group="id"
  >
    <template #item="{ element }">
      <li class="list-group-item">
        <span :class="{ bold: element.order === list[selected].order }">{{
          element.file.name
        }}</span>
        <button @click="removeFile(element.order)">X</button>
      </li>
    </template>
  </draggable>
  <MediaCarrousel :id_start="id" :media_list="media_urls" v-model="selected" />
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
</style>
