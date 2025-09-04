<script setup lang="ts">
import { dbLit } from '@/literals';
import type { DBConnection } from '@/services/database/dbInterface';
import { inject, onMounted, ref, watch, type Ref } from 'vue'

let recipeCategories = defineModel<string[]>('categories', { required: true })
let allCategories: Ref<string[]>= ref([])
let selectedCategories: Ref<number[]>= ref([])

const db = inject(dbLit) as Ref<DBConnection>
  
onMounted(async () => {
    await db.value.waitForConnection()
    allCategories.value = await db.value.getAllCategories()
    selectedCategories.value = allCategories.value
        .map((cat)=> recipeCategories.value.findIndex((c) => c===cat))
        .filter((c)=>c!==-1)
})

watch(selectedCategories, async (selection) => {
    recipeCategories.value = selectedCategories.value.map((idx) => allCategories.value[idx])
})

</script>

<template>
  <v-chip-group
    selected-class="text-primary"
    v-model="selectedCategories"
    multiple
    >
    <v-chip
        v-for="cat in allCategories"
        :key="cat"
        :text="cat"
    ></v-chip>
  </v-chip-group>
</template>

<style scoped>
</style>