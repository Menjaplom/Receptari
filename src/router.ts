import { createRouter, createWebHistory } from 'vue-router'
import RecipeList from './components/RecipeList.vue'
import ViewRecipe from './components/ViewRecipe.vue'
import NewRecipe from './components/newRecipe/NewRecipe.vue'
import { number } from 'zod'

const routes = [
  {
    path: '/',
    name: 'home',
    component: RecipeList
  },
  {
    path: '/new',
    name: 'newRecipe',
    component: NewRecipe,
    props: {
      recipe: null
    }
  },
  {
    path: '/recipe/:id/:title',
    name: 'viewRecipe', 
    component: ViewRecipe,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
