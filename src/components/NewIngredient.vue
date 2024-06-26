<script setup lang="ts">
import { ref } from 'vue'
import Ingredient from '../types/Ingredient'

const props = defineProps({
  ingredient: Ingredient
})
let ingredient = ref(props.ingredient)
</script>

<template>
  <li>
    <input type="text" placeholder="Ingredients" :value="ingredient?.name || ''" />
    <span>: </span>
    <input type="text" placeholder="unitats* (opcional)" :value="ingredient?.units || ''" />
    <input type="text" placeholder="mesura** (opcional)" :value="ingredient?.measure || ''" />
  </li>
</template>
