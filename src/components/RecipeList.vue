<script setup lang="ts">
import { dbLit } from '@/literals';
import type { DBConnection } from '@/services/database/dbInterface';
import { type RecipeThumbnail } from '@/types/RecipeThumbnail';
import { inject, onMounted, ref, type Ref } from 'vue'

const db = inject(dbLit) as Ref<DBConnection>
let thumbnails: Ref<Array<RecipeThumbnail>> = ref([])
  
onMounted(async () => {
    await db.value.waitForConnection()
    thumbnails.value = await db.value.listAllRecipes()
})


//let thumbnails: Array<RecipeThumbnail> = await db.value.listAllRecipes()
</script>

<template>
  <!--<h1>Recive list: main view</h1>
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
  </section>-->
  <v-container fluid>
    <v-row dense>
      <v-col v-for="card in thumbnails" :key="card.id" :cols="6">
        <v-card>
          <v-img
            :src="card.media"
            class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
            cover
          >
            <v-icon icon="$vuetify" class="align-right"></v-icon>
          </v-img>
          <v-card-title v-text="card.title"></v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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