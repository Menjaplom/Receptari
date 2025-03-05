<script setup lang="ts">
import { dbLit } from '@/literals';
import type { dbConnection } from '@/services/database/dbInterface';
import { inject, type Ref } from 'vue'

const db = inject(dbLit) as Ref<dbConnection>
let thumbnails = await db.value.listAllRecipes()
</script>

<template>
  <h1>Recive list: main view</h1>
  <h2 v-if="thumbnails.length < 1">No recipes. Please insert one</h2>
  <ul v-else>
    <li v-for="thumbnail in thumbnails" :key="thumbnail.id">
      <p>{{thumbnail.id}}</p>
      <p>{{ thumbnail.name }}</p>
      <img bind:src="thumbnail.url">
    </li>
  </ul>
</template>
