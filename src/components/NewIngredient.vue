<script setup lang="ts">
import { defineModel } from 'vue'

const ingredient = defineModel<string>('name', { default: '' })
const units = defineModel<number>('units', { default: 0 })
const measure = defineModel<string>('measure', { default: '' })

//TODO: sanatize inputs
</script>

<template>
  <li>
    <input type="text" placeholder="Ingredients" v-model="ingredient" />
    <span>: </span>
    <input type="number" placeholder="unitats* (opcional)" v-model="units" />
    <input type="text" placeholder="mesura** (opcional)" v-model="measure" />
  </li>
</template>
