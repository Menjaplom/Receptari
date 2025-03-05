import { createMemoryHistory, createRouter } from 'vue-router'
import RecipeList from './components/RecipeList.vue'
import NewRecipe from './components/newRecipe/NewRecipe.vue'

const routes = [
  { path: '/', component: RecipeList },
  {
    path: '/new',
    component: NewRecipe,
    props: {
      recipe: null/*{
        title: '',
        media: [],
        category: [''], // Currently hardcoding a single value to keep it simple
        tags: [''], // Currently hardcoding a single value to keep it simple
        recipeYield: -1,
        prepTime: '',
        cookTime: '',
        tools: [''], // Currently hardcoding a single value to keep it simple
        difficulty: 0,
        ingredients: [],
        directions: [],
        components: []
      }*/
    }
  }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
