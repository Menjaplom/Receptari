import { dbNameLit, dbURLLit, defaultRecipeImg } from '@/literals'
import { type DBConnection } from '../dbInterface'
import initSqlJs, { type Database } from 'sql.js'
import * as sharedLit from './sharedLiterals'
import { emptyRecipe, type Recipe } from '@/types/Recipe'
import type { RecipeThumbnail } from '@/types/RecipeThumbnail'
import { createTablesRecipes, insertRecipeBody, insertRecipeMedias, getAllRecipeThumbnails, getRecipeBody } from './tables/recipes'
import { createTablesCategories, getCategories, getRecipeCategories, insertRecipeCategories } from './tables/categories'
import { createTablesTags, getRecipeTags, getTags, insertTags } from './tables/tags'
import { createTablesTools, getRecipeTools, insertTools } from './tables/tools'
import { createTablesIngredients, getRecipeIngredients, insertIngredients } from './tables/ingredients'
import { createTablesDirections, getRecipeDirections, insertDirections } from './tables/directions'
import { createTablesComponents, getRecipeComponents, insertComponents } from './tables/components'
import type { Tag } from '@/types/Tag'
import { basicRecipe } from '../debug/mockRecipes'

export class DBSqlite implements DBConnection {
  ready: boolean
  db?: Database

  constructor() {
    this.ready = false
  }

  async connect(): Promise<void> {
    const sqlPromise = initSqlJs({ locateFile: (_) => '/node_modules/sql.js/dist/sql-wasm.wasm' })
    console.log('Wasm promised')
    let fetchGoing = true
    
    let fetchPromise
    try {
      fetchPromise = fetch(dbURLLit + dbNameLit).then(r => {
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
      console.log('Creating new DB')
      this.db = new SQL.Database()
      createTablesRecipes(this.db)
      createTablesCategories(this.db)
      createTablesTags(this.db)
      createTablesTools(this.db)
      createTablesIngredients(this.db)
      createTablesDirections(this.db)
      createTablesComponents(this.db)
      this.ready = true
      console.log('New DB created')
    } else {
      const dbArr = await fetchResponse.response.arrayBuffer().then((arr) => new Uint8Array(arr))
      this.db = new SQL.Database(dbArr)
      this.ready = true
    }
    this.addRecipe(basicRecipe) //! DEBUG
    return Promise.resolve()
  }

  async waitForConnection(): Promise<void> {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms))
    
    while (!this.ready) {
      console.log('Waiting for db to be ready...')
      await delay(100)
    }
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

  async getRecipe(recipeId: number): Promise<Recipe> {
    if (!this.db) {
      throw Error('DB not initialized')
    }
    let recipe = emptyRecipe
    getRecipeBody(this.db, recipeId, recipe)
    getRecipeCategories(this.db, recipeId, recipe)
    getRecipeTags(this.db, recipeId, recipe)
    getRecipeTools(this.db, recipeId, recipe)
    getRecipeIngredients(this.db, recipeId, recipe)
    getRecipeDirections(this.db, recipeId, recipe)
    let componentIds = getRecipeComponents(this.db, recipeId)
    for (let compId of componentIds) {
      recipe.components.push(await this.getRecipe(compId))
    }
    
    console.log(JSON.stringify(recipe))
    return Promise.resolve(recipe)
  }

  getAllCategories(): Promise<string[]> {
    return Promise.resolve(getCategories(this.db!))
  }


  getAllTags(): Promise<Tag[]> {
    return Promise.resolve(getTags(this.db!))
  }

  getAllTools(): Promise<string[]> {
    console.log('Method not implemented.')
    return Promise.resolve([] as string[])
  }
}
