<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import MediaCarrousel from './MediaCarrousel.vue'
import { NewMedia, type Media } from '../../types/Media'
import { repoUrlLit } from '@/literals'

const props = defineProps({
  parent_id: String,
  n_id: Number,
  add_but_msg: String
})
const newMediaList = defineModel<Array<NewMedia>>('new_media_list', { required: true  })
/*let newMediaList: Ref<Array<NewMedia>> = ref( mediaList.value.map((media, idx) => {
  return {
    ...media,
    'order': idx,
    'urlAux': media.url,
    'file': undefined
  }
}))*/
let counter = newMediaList.value.length
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
const mediaList = computed(() => {
  return newMediaList.value?.map((m) => {
        return {
        'url': m.urlAux,
        'footer': m.footer
      }
    }) || []
})

// Add URL to carrousel
function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) {
    return
  }

  for (const file of input.files) {
    console.log("file name " + file.name)
    const newUrl = repoUrlLit + '/' //TODO: PROGRAM VALID URL
    const auxUrl = URL.createObjectURL(file)
    
    console.log("medialist is result: " + newMediaList.value.find((v) => v.url == newUrl) )
    if (newMediaList.value.find((v) => v.urlAux == auxUrl) === undefined) {
      console.log("still going " + file.name)
      let auxMed = new NewMedia({'url': newUrl}, counter++)
      auxMed.urlAux = auxUrl
      auxMed.file = file
      newMediaList.value.push(auxMed)
    }
  }
}

//
function removeFile(id: number) {
  for (let i = 0; i < (newMediaList.value.length || 0); ++i) {
    if ((newMediaList.value[i].dragId || -1) === id) {
      newMediaList.value.splice(i, 1)
      if (i <= selected.value && selected.value !== 0) {
        selected.value -= 1
      }
      break
    }
  }
}
</script>

<template>
  <label :for="id + '_add_button'" class="addImage">{{add_but_msg}}</label>
  <input
    type="file"
    :id="id + '_add_button'"
    :name="id + '_add_button'"
    accept=".jpg, .jpeg, .png"
    multiple
    v-on:change="onFileChange($event)"
    hidden
  />
  <draggable
    class="list-group"
    tag="ul"
    :component-data="{
      tag: 'ul',
      type: 'transition-group',
      name: !drag ? 'flip-list' : null
    }"
    v-model="newMediaList"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
    item-key="dragId"
    :group="id"
  >
    <template #item="{ element }">
      <li class="list-group-item">
        <span :class="{ bold: element.dragId === newMediaList[selected].dragId }">{{
          element.file.name
        }}</span>
        <button @click="removeFile(element.dragId)">X</button>
      </li>
    </template>
  </draggable>
  <MediaCarrousel :id_start="id" :media_list="mediaList" v-model:selected="selected" />
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
