import { dbURLLit, defaultRecipeImg } from '@/literals'
import { type DBConnection } from '../dbInterface'
import initSqlJs, { type Database } from 'sql.js'
import * as sharedLit from './sharedLiterals'
import type { Recipe } from '@/types/Recipe'
import type { RecipeThumbnail } from '@/types/RecipeThumbnail'
import { createTableRecipes, createTableRecipeMedia, insertRecipeBody, insertRecipeMedias, getAllRecipeThumbnails } from './tables/recipes'
import { createTableCategories, createTableRecipeCategory, insertRecipeCategories } from './tables/categories'
import { createTableRecipeTags, createTableTags, insertTags } from './tables/tags'
import { createTableRecipeTools, insertTools } from './tables/tools'
import { createTableIngredients, createTableRecipeIngredients, insertIngredients } from './tables/ingredients'
import { createTableDirectionMedia, createTableDirections, createTableRecipeDirections, insertDirections } from './tables/directions'
import { createTableRecipeComponents, insertComponents } from './tables/components'

export class DBSqlite implements DBConnection {
  ready: boolean
  db?: Database

  constructor() {
    this.ready = false
  }

  async connect(dbName: string): Promise<void> {
    const sqlPromise = initSqlJs({ locateFile: (_) => '/node_modules/sql.js/dist/sql-wasm.wasm' })
    console.log('Wasm promised')
    let fetchGoing = true
    
    let fetchPromise
    try {
      fetchPromise = fetch(dbURLLit).then(r => {
        if(JSON.stringify(r) == '{}') {
          return { response: undefined, going: false }
        }
        return { response: r, going: true }
      }).catch((error) => {
        console.log(error)
        return { response: undefined, going: false }
      })
    } catch {
      fetchPromise = { response: undefined, going: false }
    }
    const [SQL, fetchResponse] = await Promise.all([sqlPromise, fetchPromise])
    console.log('Wasm loaded')
    console.log(`fetchGoing ${fetchResponse.going}`)
    console.log(`fetchResponse ${fetchResponse.response?.ok}`)
    if (!fetchGoing || !fetchResponse.response?.ok) {
      this.db = new SQL.Database()
      
      console.log(createTableRecipes)
      this.db.run(createTableRecipes)
      console.log('Table Recipes created.')
      this.db.run(createTableRecipeMedia)
      console.log('Table RecipeMedia created.')
      this.db.run(createTableCategories)
      console.log('Table Categories created.')
      this.db.run(createTableRecipeCategory)
      console.log('Table RecipeCategory created.')
      this.db.run(createTableTags)
      console.log('Table TableTags created.')
      this.db.run(createTableRecipeTags)
      console.log('Table RecipeTags created.')
      this.db.run(createTableRecipeTools)
      console.log('Table RecipeTools created.')
      this.db.run(createTableIngredients)
      console.log('Table Ingredients created.')
      this.db.run(createTableRecipeIngredients)
      console.log('Table RecipeIngredients created.')
      this.db.run(createTableDirections)
      console.log('Table Directions created.')
      this.db.run(createTableRecipeDirections)
      console.log('Table RecipeDirections created.')
      this.db.run(createTableDirectionMedia)
      console.log('Table DirectionMedia created.')
      this.db.run(createTableRecipeComponents)
      console.log('Table RecipeComponents created.')
      this.ready = true
    } else {
      const dbArr = await fetchResponse.response.arrayBuffer().then((arr) => new Uint8Array(arr))
      this.db = new SQL.Database(dbArr)
      this.ready = true
    }

    return Promise.resolve()
  }

  async addRecipe(recipe: Recipe): Promise<RecipeThumbnail> {
    if (!this.ready) return Promise.reject('addRecipe: DB not ready')
    this.db!.run(sharedLit.beginTransaction)
    try {
      const recipeId = insertRecipeBody(this.db!, recipe)
      console.log('addRecipe recipe id: ' + recipeId)
      const thumbnailMedia = insertRecipeMedias(this.db!, recipe, recipeId)
      insertRecipeCategories(this.db!, recipe, recipeId)
      insertTags(this.db!, recipe, recipeId)
      insertTools(this.db!, recipe, recipeId)
      insertIngredients(this.db!, recipe, recipeId)
      insertDirections(this.db!, recipe, recipeId)
      insertComponents(this.db!, recipe, recipeId)
      this.db!.run(sharedLit.commitTransaction)
      console.log('Recipe ' + recipe.title + 'commited to db.')
      return Promise.resolve({id: recipeId, title: recipe.title, media: thumbnailMedia})
    }
    catch (e) {
      console.log('AddRecipe rolling back. Error:' + e)
      this.db!.run(sharedLit.rollbackTransaction)
      return Promise.reject('Transaction failed: ' + e)
    }
  }
 
  async listAllRecipes(): Promise<Array<RecipeThumbnail>> {
    if (!this.ready) return Promise.reject('listAllRecipes: DB not ready')
    try {
      let recipes = getAllRecipeThumbnails(this.db!)
      return Promise.resolve(recipes)
    }
    catch (e) {
      return Promise.reject(e)
    }
  }

}
