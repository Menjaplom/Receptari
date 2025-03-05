<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import { emptyDirection, NewDirection, type Direction } from '../../types/Direction'
import AddMedia from '../media/AddMedia.vue'

const props = defineProps({
  parent_id: String,
  n_id: Number
})
const id = props.parent_id + 'newDirectionList' + props.n_id
const list = defineModel<Array<NewDirection>>('direction_list', { required: true  })
let counter = list.value.length

// Draggable logic
const drag = ref(false)
const dragOptions = computed(() => {
  return {
    animation: 200,
    group: 'description',
    //disabled: true,
    ghostClass: 'ghost'
  }
})

function addDirection() {
  if (list.value.length === 0 || list.value[list.value.length - 1].description !== '') {
    let auxDir = emptyDirection

    list.value.push(new NewDirection(auxDir, counter++))
  }
}

function removeDirection(dragId: number) {
  for (let i = 0; i < list.value.length; i++) {
    if (list.value[i].dragId === dragId) {
      list.value.splice(i, 1)
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
    item-key="key"
    handle=".handle"
    :group="id"
  >
    <template #item="{ element }">
      <li class="list-group-item">
        <span class="handle"></span>
        <input type="text" v-model="element.description" />
        
        <button @click="removeDirection(element.key)">X</button>
        <AddMedia v-model:new_media_list="element.media" :parent_id="id" :n_id="element.key" :add_but_msg="'Add image'"/>
        {{ element }}
      </li>
    </template>
  </draggable>
  <button @click="addDirection">Add direction</button>
</template>

<style>
.handle {
  float: left;
  padding: 8px;
  background-image: url(../icons/drag-handle.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.addImage {
  padding: 8px;
  background-image: url(../icons/image-plus.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
