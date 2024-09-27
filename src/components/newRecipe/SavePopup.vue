<script setup lang="ts">
import draggable from 'vuedraggable'
import LoadingBar from '@/components/misc/LoadingBar.vue'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

const visible = defineModel<boolean>('visible')
let saveAcknowledged: Ref<boolean> = ref(false)
let message: string = 'default message'
function saveProcess() {
  saveAcknowledged.value = true
}
</script>

<template>
  <div class="popup" v-if="visible">
    <div class="popup-inner">
      <div v-if="!saveAcknowledged">
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
    </div>
  </div>
</template>

<style scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);

  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner {
    background: #fff;
    padding: 32px;
  }
  p {
    color: black;
  }
}
</style>
