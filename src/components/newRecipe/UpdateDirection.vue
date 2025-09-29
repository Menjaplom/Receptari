<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import { emptyDirection, NewDirection, type Direction } from '../../types/Direction'
import AddMedia from '../media/AddMedia.vue'
import { mdiDragHorizontalVariant, mdiClose } from '@mdi/js'

const props = defineProps({
  parent_id: String,
  n_id: Number
})
const id = props.parent_id + 'newDirectionList' + props.n_id
const list = defineModel<Array<NewDirection>>('direction_list', { required: true })
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
    item-key="dragId"
    handle=".handle"
    :group="id"
  >
    <template #item="{ element }">
      <li class="list-group-item" :style="{ display: 'inline-flex', width: '100%' }">
        <v-icon :icon="mdiDragHorizontalVariant" role="img" aria-hidden="false" :class="'handle'" />
        <div :style="{ width: '100%' }">
          <div :style="{ display: 'inline-flex', width: '100%' }">
            <v-textarea
              label="Direction"
              variant="solo-filled"
              v-model="element.description"
              rows="2"
              clearable
              style="width: 100%"
            />
          </div>
          <div>
            <v-expansion-panels>
              <v-expansion-panel title="Add media">
                <v-expansion-panel-text>
                  <AddMedia
                    v-model:new_media_list="element.media"
                    :parent_id="id"
                    :n_id="element.dragId"
                    :add_but_msg="'Add image'"
                  />
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
        <v-icon
          :icon="mdiClose"
          role="img"
          aria-hidden="false"
          @click="removeDirection(element.dragId)"
        />
      </li>
    </template>
  </draggable>

  <button @click="addDirection">Add direction</button>
</template>

<style>
.addImage {
  padding: 8px;
  background-image: url(../icons/image-plus.svg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
