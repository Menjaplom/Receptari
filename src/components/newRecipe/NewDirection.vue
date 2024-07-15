<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import NewDirection from '../../types/NewDirection'
import AddMedia from '../media/AddMedia.vue'

const props = defineProps({
  parent_id: String,
  n_id: Number
})
const id = props.parent_id + 'newDirectionList' + props.n_id
let order_counter = 0

const drag = ref(false)
const list: Ref<Array<NewDirection>> = ref([])
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
    list.value.push(new NewDirection(++order_counter, '', []))
  }
}

function removeDirection(key: number) {
  list.value = list.value.filter((direction) => {
    return direction.key !== key
  })
}

// Add URL to carrousel
function onFileChange(e: Event, d: NewDirection) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) {
    return
  }

  for (const file of input.files) {
    d.media.push({ file: file, url: URL.createObjectURL(file), order: ++order_counter })
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
        <label for="image_uploads" class="addImage"></label>
        <input
          type="file"
          id="image_uploads"
          name="image_uploads"
          accept=".jpg, .jpeg, .png"
          multiple
          v-on:change="onFileChange($event, element)"
          hidden
        />
        <button @click="removeDirection(element.key)">X</button>
        <AddMedia v-model:media_list="element.media" :parent_id="id" :n_id="element.key" />
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
