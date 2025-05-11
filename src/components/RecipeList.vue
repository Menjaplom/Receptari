<script setup lang="ts">
import { dbLit } from '@/literals';
import type { DBConnection } from '@/services/database/dbInterface';
import { type RecipeThumbnail } from '@/types/RecipeThumbnail';
import { inject, ref, type Ref } from 'vue'

const db = inject(dbLit) as Ref<DBConnection>
let thumbnails: Ref<Array<RecipeThumbnail>> = ref([])
async function checkDBstate() {
  if (!db.value.ready) {
    console.log('RecipeList.vue: Waiting for db to be ready...')
    setTimeout(() => checkDBstate(), 100);
  }
  else {
    thumbnails.value = await db.value.listAllRecipes()
  }
}
await checkDBstate()
//let thumbnails: Array<RecipeThumbnail> = await db.value.listAllRecipes()
</script>

<template>
  <h1>Recive list: main view</h1>
  <h2 v-if="thumbnails.length < 1">No recipes. Please insert one</h2>
  <section class="cards" v-else>
    <article class="card" v-for="thumbnail in thumbnails" :key="thumbnail.id">
      <RouterLink :to="{ name: 'viewRecipe', params: { idStr: thumbnail.id.toString(), title: thumbnail.title } }">
        <p>{{thumbnail.id}}</p>
        <picture>
          <source :src="thumbnail.media" />
          <img src="../../static/debug/recipeThumbnail.png" alt="Recipe not found" />
        </picture>
        <p>{{ thumbnail.title }}</p>
      </RouterLink>
    </article>
  </section>
</template>

<style scoped>
.cards {
    display: flex;
    flex-wrap: wrap;
  justify-content: center;
 }


.card {
  /*margin: 1rem;*/
  background-color: rgb(0, 187, 255);
  padding: 1rem;
    /*flex: 1 0 500px;
    margin: 1rem .25em;*/
}

p {
  color: black;
  text-align: center;
}

</style>