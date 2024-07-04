<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import MediaCarrousel from './MediaCarrousel.vue'
import MediaCarrouselData from '../../types/MediaCarrouselData'

let order_counter = -1
let id = 'first_media' //To be passed down the parent component

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
let selected = ref(0)
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
    group="holi"
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
  <MediaCarrousel :id_start="id" :media_list="media_urls" @selected="(s) => (selected = s)" />
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
