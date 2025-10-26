<script setup lang="ts">
import type { NewRecipe } from '@/types/Recipe'

const props = defineProps({
  id: String
})

const parent_id = props.id
</script>

<template>
  <p>Im a composed recipe</p>
</template>
