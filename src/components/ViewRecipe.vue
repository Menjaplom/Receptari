<script setup lang="ts">
import { dbLit } from '@/literals';
import type { DBConnection } from '@/services/database/dbInterface';
import { inject, ref, type Ref } from 'vue';
import MediaCarrousel from './media/MediaCarrousel.vue';
import type { Recipe } from '@/types/Recipe';
import ViewComponent from './ViewComponent.vue';


const props = defineProps<{
  id: number  // FIXME: it is currently being parsed as a string. Find how to recieve a number, or let it as string and parse it.
  title?: string
}>()

const db: Ref<DBConnection> = inject(dbLit) as Ref<DBConnection>
const pageId = `recipe_${props.id}_`

const recipe: Recipe = await db.value.getRecipe(props.id)


let selected = ref(0) // TODO: check if can be ommited by using a simple default prop with no emit capture
</script>

<template>
    <h1>{{ id }}</h1>
    <h2>{{ title ?? '' }}</h2>
    <MediaCarrousel :id_start="pageId" :media_list="recipe.media" v-model:selected="selected"></MediaCarrousel>
    
    <div v-if="recipe.category">
      <h3>Category</h3>
      <span v-for="c in recipe.category">
        {{ c }}
      </span>
    </div>
    
    <div v-if="recipe.tags">
      <h3>Tags</h3>
      <span v-for="t in recipe.tags" :style="{backgroundColor: t.color}">
        {{ t.tag }}
      </span>
    </div>

    <div v-if="recipe.description">
      <h3>Description</h3>
      <p>{{recipe.description}}</p>
    </div>

    <div v-if="recipe.yield">
      <h3>Yield</h3>
      <span>{{recipe.yield.units}}</span>
      <span>{{recipe.yield.measure}}</span>
    </div>
    
    <div v-if="recipe.prepTime">
      <h3>Preparation time</h3>
      <span>{{recipe.prepTime}}</span>
    </div>

    <div v-if="recipe.cookTime">
      <h3>Cook time</h3>
      <span>{{recipe.cookTime}}</span>
    </div>

    <div v-if="recipe.tools">
      <h3>Tools</h3>
      <div v-for="t in recipe.tools">
        <span>{{ t.name }}</span>
        <span>{{ t.description }}</span>
      </div>
    </div>

    <div>
      <h3>Difficulty</h3>
      <span v-for="d in 5">
        {{ (d <= (recipe.difficulty ?? -1 ))? "*": "·"  }}
      </span>
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
        <MediaCarrousel :id_start="pageId+'_dir'+i" :media_list="d.media" :selected="0"></MediaCarrousel>
      </div>
    </div>

    <div v-if="recipe.components.length">
      <h3>Components</h3>
      <div v-for="c,i in recipe.components">
        <ViewComponent :recipe="c" :id="pageId+'_comp'+i"></ViewComponent>
      </div>
    </div>
</template>

<style></style>