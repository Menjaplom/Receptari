<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import MediaCarrousel from './MediaCarrousel.vue'
import MediaCarrouselData from '../../types/MediaCarrouselData'

let order_counter = -1
let id = 'first_media'
// TODO: REMOVE THIS EXAMPLE IMAGES
/*let media: Array<string> = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80',
  'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2842&q=80',
  'https://www.w3schools.com/html/mov_bbb.mp4'
]*/

let list: Ref<Array<MediaCarrouselData>> = ref([])
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
const media_urls = computed(() => {
  return list.value.map((m) => {
    return m.url
  })
})

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement

  if (!input.files?.length) {
    return
  }

  for (const file of input.files) {
    list.value.push({ file: file, url: URL.createObjectURL(file), order: ++order_counter })
  }
}

function removeFile(order: number) {
  console.log(`order: ${order} .`)
  for (let i = 0; i < list.value.length; ++i) {
    console.log(`i: ${i} .`)
    if (list.value[i].order === order) {
      console.log(`value ${i} is about to be spliced.`)
      list.value.splice(i, 1)
      break
    }
  }
  console.log(`array ${JSON.stringify(list.value)} .`)
}
</script>

<template>
  <h1>Media List</h1>
  <div>
    <label for="image_uploads">Choose images to upload (PNG, JPG)</label>
    <input
      type="file"
      id="image_uploads"
      name="image_uploads"
      accept=".jpg, .jpeg, .png"
      multiple
      v-on:change="onFileChange"
    />
  </div>

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
        <span>{{ element.file.name }}</span>
        <button @click="removeFile(element.order)">X</button>
      </li>
    </template>
  </draggable>
  <MediaCarrousel :id_start="id" :media_list="media_urls" />
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
