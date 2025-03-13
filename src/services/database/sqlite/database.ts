import { dbURLLit, defaultRecipeImg } from '@/literals'
import { type DBConnection } from '../dbInterface'
import initSqlJs, { type Database } from 'sql.js'
import * as sharedLit from './sharedLiterals'
import type { Recipe } from '@/types/Recipe'
import type { RecipeThumbnail } from '@/types/RecipeThumbnail'
import { isImage } from '@/types/Media'
import { createTableRecipes, createTableRecipeMedia, insertRecipeMedia, insertRecipeBody } from './tables/recipes'
import { createTableCategories, createTableRecipeCategory, insertRecipeCategories } from './tables/categories'
import { createTableRecipeTags, createTableTags, insertTags } from './tables/tags'
import { createTableRecipeTools, createTableTools, insertTools } from './tables/tools'
import { createTableIngredients, createTableRecipeIngredients } from './tables/ingredients'
import { createTableDirectionMedia, createTableDirections, createTableRecipeDirections, insertDirection, insertDirectionMedia, insertRecipeDirection } from './tables/directions'
import { createTableRecipeComponents, insertRecipeComponent } from './tables/components'

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
      this.db.run(createTableTools)
      console.log('Table Tools created.')
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

  

  #insertDirection(recipe: Recipe, recipeId: number){
    const stmtDirection = this.db!.prepare(insertDirection);
    const stmtRecipeDirections = this.db!.prepare(insertRecipeDirection);
    const stmtDirectionMedia = this.db!.prepare(insertDirectionMedia);
    recipe.directions.forEach((dir, idx) => {
      const directionId = stmtDirection.getAsObject({
        ":description": dir.description
      })
      stmtRecipeDirections.run({
        ":recipeId": recipeId,
        ":directionId": directionId['id'],
        ":position": idx
      })
      dir.media.forEach((media, idx) => {
        stmtDirectionMedia.run({
          ":directionId": directionId['id'],
          ":position": idx,
          ":url": media.url,
          ":footer": media.footer! || null
        })
      })
    });
    stmtDirection.free();
    stmtRecipeDirections.free();
    stmtDirectionMedia.free();
  }

  // TODO: Break into smaller functions
  // TODO: check the order of things gets infered from the indexes of the arrays where data is stored (see components section)
  async addRecipe(recipe: Recipe): Promise<RecipeThumbnail> {
    if (!this.ready) return Promise.reject('DB not ready')
    this.db!.run(sharedLit.beginTransaction)
    try {
      // Insert recipe body
      let recipeBodyRes = insertRecipeBody(this.db!, recipe)
      if (recipeBodyRes.error) {
        throw new Error(recipeBodyRes.error)
      }
      const recipeId = recipeBodyRes.recipeId

      // Insert recipe media 
      let recipeMediaRes = insertRecipeMedia(this.db!, recipe, recipeId)
      if (recipeMediaRes.error) {
        throw new Error(recipeMediaRes.error)
      }
      const thumbnailMedia = recipeMediaRes.thumbnailMedia

      // Bond categories onto recipe
      let error = insertRecipeCategories(this.db!, recipe, recipeId)
      if (error) {
        throw new Error(error)
      }
      // Insert tag
      error = insertTags(this.db!, recipe, recipeId)
      if (error) {
        throw new Error(error)
      }
      // Insert tools
      error = insertTools(this.db!, recipe, recipeId)
      if (error) {
        throw new Error(error)
      }
      // Insert ingredients
      const stmtIngredient = this.db!.prepare(insertTool);
      const stmtRecipeIngredient = this.db!.prepare(insertRecipeTool);
      recipe.ingredients.forEach((ingr, idx) => {
        stmtIngredient.run({
          ":name": ingr.name
        })
        stmtRecipeIngredient.run({
          ":recipeId": recipeId,
          ":ingredient": ingr.name,
          ":position": idx,
          ":units": ingr.units! || null,
          ":measur": ingr.measure! || null
        })
      });
      stmtIngredient.free();
      stmtRecipeIngredient.free();
      // Insert directions
      this.#insertDirection(recipe, recipeId)
      // Insert components
      const stmtRecipeComponent = this.db!.prepare(insertRecipeComponent);
      recipe.components.forEach((comp, idx)=> {
        stmtRecipeComponent.run({
          ":baseRecipe": recipeId,
          ":component": comp.id,
          ":position": idx
        })
      })
      stmtRecipeComponent.free();
      Promise.resolve({id: recipeId, title: recipe.title, media: thumbnailMedia})
    }
    catch {
      console.log()
      this.db!.run(sharedLit.rollbackTransaction)
    }
    
    return Promise.reject('DB not ready')
  }
 
  listAllRecipes(): Promise<Array<RecipeThumbnail>> {
    throw new Error('Method not implemented.')
  }
  insertRecipe(recipe: Recipe): Promise<RecipeThumbnail> {
    throw new Error('Method not implemented.')
  }

}
