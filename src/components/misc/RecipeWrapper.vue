<script setup lang="ts">

const props = defineProps<{
  isExpandable: boolean
}>()

</script>

<template>
  <v-expansion-panels v-if="isExpandable">
    <v-expansion-panel title="Title">
      <v-expansion-panel-text>
        <slot></slot>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>

  <v-sheet
    v-else
    elevation="4"
    width="100%"
    rounded
  >
    <slot></slot>
  </v-sheet>
</template>
