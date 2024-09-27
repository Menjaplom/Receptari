<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'

const props = defineProps<{
  progress: number
}>()
</script>

<template>
  <div id="base">
    <div class="shell">
      <div class="bar" :style="{ width: progress + '%' }">
        <span>{{ progress }}%</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
#base {
  /*height: 50vh;*/
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
}

.shell {
  height: 28px;
  width: 250px;
  border: 1px solid #aaa;
  border-radius: 13px;
  padding: 3px;
}

.bar {
  background: linear-gradient(to right, #b993d6, #8ca6db);
  height: 20px;
  border-radius: 9px;
}
.bar span {
  float: right;
  padding: 4px 5px;
  color: #fff;
  font-size: 0.7em;
}
</style>
