<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

const visible = defineModel<boolean>('visible')
</script>

<template>
  <div class="popup" v-if="visible" @click="visible = false">
    <div class="popup-inner" @click.stop><slot></slot></div>
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
