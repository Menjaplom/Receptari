import { dbURLLit } from '@/literals'
import * as createLit from '@/services/database/sqlite/creationLiterals'
import { type dbConnection } from '../dbInterface'
import initSqlJs, { type Database } from 'sql.js'
import type NewRecipe from '@/types/NewRecipe'
import * as sharedLit from './sharedLiterals'
import * as insertLit from './insertionLiterals'

export class DBSqlite implements dbConnection {
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
        console.log('im accepting the goddamn promise')
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
      
      console.log(createLit.createTableRecipes)
      this.db.run(createLit.createTableRecipes)
      console.log('Table Recipes created.')
      this.db.run(createLit.createTableRecipeMedia)
      console.log('Table RecipeMedia created.')
      this.db.run(createLit.createTableCategories)
      console.log('Table Categories created.')
      this.db.run(createLit.createTableRecipeCategory)
      console.log('Table RecipeCategory created.')
      this.db.run(createLit.createTableTags)
      console.log('Table TableTags created.')
      this.db.run(createLit.createTableRecipeTags)
      console.log('Table RecipeTags created.')
      this.db.run(createLit.createTableTools)
      console.log('Table Tools created.')
      this.db.run(createLit.createTableRecipeTools)
      console.log('Table RecipeTools created.')
      this.db.run(createLit.createTableIngredients)
      console.log('Table Ingredients created.')
      this.db.run(createLit.createTableRecipeIngredients)
      console.log('Table RecipeIngredients created.')
      this.db.run(createLit.createTableDirections)
      console.log('Table Directions created.')
      this.db.run(createLit.createTableRecipeDirections)
      console.log('Table RecipeDirections created.')
      this.db.run(createLit.createTableDirectionMedia)
      console.log('Table DirectionMedia created.')
      this.db.run(createLit.createTableRecipeComponents)
      console.log('Table RecipeComponents created.')
      this.ready = true
    } else {
      const dbArr = await fetchResponse.response.arrayBuffer().then((arr) => new Uint8Array(arr))
      this.db = new SQL.Database(dbArr)
      this.ready = true
    }

    return Promise.resolve()
  }

  async addRecipe(recipe: NewRecipe): Promise<void> {
    if (!this.ready) return Promise.reject('DB not ready')
    this.db!.run(sharedLit.beginTransaction)
    const stmt = this.db!.prepare(insertLit.insertRecipe);
    let stmtObject = {}
    
    /*const result = stmt.getAsObject({':name': recipe.title,
      ':yield': recipe.recipeYield,
      ':prepTime': recipe.prepTime,
      ':cookTime': recipe.cookTime,
      ':difficulty': recipe.difficulty})*/
    //return Promise.reject('DB not ready')
  }
 
}
