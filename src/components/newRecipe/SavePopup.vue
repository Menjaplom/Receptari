<script setup lang="ts">
import draggable from 'vuedraggable'
import LoadingBar from '@/components/misc/LoadingBar.vue'
import PopUp from '@/components/misc/PopUp.vue'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { inject } from 'vue'
import { loggedInLit } from '@/literals'

const visible = defineModel<boolean>('visible')
let saveAcknowledged: Ref<boolean> = ref(false)
let message: string = 'default message'
const loggedIn: Ref<boolean> = inject(loggedInLit) as Ref<boolean>
console.log('value loggedIn on pop up ' + loggedIn.value)
const emit = defineEmits(['runProcess'])

function saveProcess() {
  saveAcknowledged.value = true
  emit('runProcess')
}
</script>

<template>
  <PopUp v-model:visible="visible">
    <div v-if="!loggedIn">
      <p>Please, log in before sending the recipe.</p>
    </div>
    <div v-else-if="!saveAcknowledged">
      <p>Are you sure you want to proceed saving the recipe?</p>
      <button
        class="popup-close"
        @click="
          () => {
            visible = false
          }
        "
      >
        Cancel
      </button>
      <button class="popup-close" @click="saveProcess()">Proceed</button>
    </div>
    <div v-else>
      <LoadingBar :progress="50" />
      <p>{{ message }}</p>
    </div>
  </PopUp>
</template>
