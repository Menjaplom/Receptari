<script setup lang="ts">
import { dbLit } from '@/literals';
import type { DBConnection } from '@/services/database/dbInterface';
import { inject, ref, type Ref } from 'vue';
import MediaCarrousel from './media/MediaCarrousel.vue';
import type { Recipe } from '@/types/Recipe';

const props = defineProps<{
  recipe: Recipe
  id: string
}>()



let selected = ref(0) // TODO: check if can be ommited by using a simple default prop with no emit capture
</script>

<template>
    <h2>{{ recipe.title ?? '' }}</h2>
    <MediaCarrousel :id_start="id+'_media'" :media_list="recipe.media" v-model:selected="selected"></MediaCarrousel>

    <div v-if="recipe.description">
      <h3>Description</h3>
      <p>{{recipe.description}}</p>
    </div>

    <div v-if="recipe.tools">
      <h3>Tools</h3>
      <div v-for="t in recipe.tools">
        <span>{{ t.name }}</span>
        <span>{{ t.description }}</span>
      </div>
    </div>

    <div v-if="recipe.ingredients">
      <h3>Ingredients</h3>
      <div v-for="i in recipe.ingredients">
        <span>{{ i.name +': '}}</span>
        <span>{{ i.units }}</span>
        <span>{{ i.measure }}</span>
      </div>
    </div>

    <div>
    <h3>Directions</h3>
      <div v-for="d,i in recipe.directions">
        <p>{{ d.description +': '}}</p>
        <MediaCarrousel :id_start="id+'_dir'+i" :media_list="d.media" :selected="0"></MediaCarrousel>
      </div>
    </div>
</template>

<style></style>