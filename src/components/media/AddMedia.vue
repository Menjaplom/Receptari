<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed, type Ref } from 'vue'
import MediaCarrousel from './MediaCarrousel.vue'
import { NewMedia, type Media } from '../../types/Media'
import { repoUrlLit } from '@/literals'
import { mdiDragHorizontalVariant } from '@mdi/js';


const props = defineProps({
  parent_id: String,
  n_id: Number,
  add_but_msg: String
})

const newMediaList = defineModel<Array<NewMedia>>('new_media_list', { required: true  })

const newMediaFiles: Ref<File[]> = ref([]) // todo: shallowRef
const counter: Ref<number> = ref(0) 

let nextDragId = newMediaList.value.length
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
      let auxMed = new NewMedia({'url': newUrl}, counter.value++)
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

function appendNewMediaFile(file: File) {
    console.log("file name " + file.name)
    const newUrl = repoUrlLit + '/' + file.name //TODO: PROGRAM VALID URL
    const auxUrl = URL.createObjectURL(file)
    
    console.log("medialist is result: " + newMediaList.value.find((v) => v.url == newUrl) )
    if (!newMediaList.value.find((v) => v.urlAux == auxUrl)) {
      console.log("still going " + file.name)
      let auxMed = new NewMedia({'url': newUrl}, nextDragId++)
      auxMed.urlAux = auxUrl
      auxMed.file = file
      newMediaList.value.push(auxMed)
    }
}

function appendNewMediaFiles(mediaFiles: File | File[]) {
  if (Array.isArray(mediaFiles)) {
    for (let file of mediaFiles) {
      appendNewMediaFile(file)
    }
  } else {
    appendNewMediaFile(mediaFiles)
  }
  //newMediaFiles.value = []
}

const video_supp = ['mp4', 'ogg', 'webm']

</script>

<template>
  
  <v-file-input
    v-model="newMediaFiles"
    label="File input"
    placeholder="Upload your documents"
    multiple
    @update:modelValue="appendNewMediaFiles"
  >
    <template v-slot:selection="{ fileNames }"> </template>
  </v-file-input>

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
    handle=".handle"
  >
    <template #item="{ element, index }">
      <li class="list-group-item">
        <v-icon :icon="mdiDragHorizontalVariant" role="img" aria-hidden="false" :class="'handle'"/>

        <span :class="{ bold: element.dragId === newMediaList[selected].dragId }">{{
          newMediaList[index].file?.name || "i'll figure it out later"
        }}</span>

        <v-text-field label="Footer" v-model="newMediaList[index].footer" clearable/>

        <button @click="removeFile(element.dragId)">X</button>
      </li>
    </template>
  </draggable>

  <v-carousel
    v-model="selected"
    height="400"
  >
    <v-carousel-item
      v-for="(item, i) in newMediaList"
      :key="i"
      cover
    >
    <div
      v-if="!video_supp.includes(item.url?.split('.').pop() ?? '')"
      class="slide"
      :style="`background-image: url(${item.urlAux});`"
    ></div>
    <div v-else class="slide">
      <video :src="item.urlAux" controls></video>
    </div>
  </v-carousel-item>

    <v-overlay
      :scrim="false"
      content-class="w-100 h-100 d-flex flex-column align-center justify-space-between pointer-pass-through py-3"
      contained
      model-value
      no-click-animation
      persistent
    >
      <v-scroll-x-transition mode="out-in" appear>
        <v-sheet
          :key="selected"
          rounded="xl"
        >
          <v-list-item
            v-if="newMediaList.length > 0 && newMediaList[selected].footer"
            :title="newMediaList[selected].footer"
            class="pa-1 pr-6"
          >
          
          </v-list-item>
        </v-sheet>
      </v-scroll-x-transition>
    </v-overlay>
  </v-carousel>
  <!--<MediaCarrousel :id_start="id" :media_list="mediaList" v-model:selected="selected" />-->
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
