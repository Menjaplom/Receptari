<script setup lang="ts">
import { mdiChefHat } from '@mdi/js';
import { computed, ref } from 'vue';

let difficulty = defineModel<number>('difficulty', { default: -1 })
let currentlyHovered = ref(-1)

const colors = computed(() => {
    if (currentlyHovered.value === -1) {
        return [...Array(5).keys()].map((v, idx) => idx <= difficulty.value? 'green': 'grey')
    }

    return [...Array(5).keys()].map((v, idx) => idx <= currentlyHovered.value? 'yellow': 'grey')
})
</script>

<template>
  <v-icon 
    v-for="idx of [...Array(5).keys()]"
    :color="colors[idx]"
    @mouseover="currentlyHovered = idx"
    @mouseleave="currentlyHovered = -1"
    @click="difficulty=idx"
    :icon="mdiChefHat">
  </v-icon>
</template>

<style>
</style>