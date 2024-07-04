import { createMemoryHistory, createRouter } from 'vue-router'
import RecipeList from './components/RecipeList.vue'
import NewRecipe from './components/newRecipe/NewRecipe.vue'

const routes = [
  { path: '/', component: RecipeList },
  { path: '/new', component: NewRecipe }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
