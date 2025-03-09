import { dbURLLit } from '@/literals'
import * as createLit from '@/services/database/sqlite/creationLiterals'
import { type DBConnection } from '../dbInterface'
import initSqlJs, { type Database } from 'sql.js'
import type Recipe from '@/types/NewRecipe'
import * as sharedLit from './sharedLiterals'
import * as insertLit from './insertionLiterals'
import type { Recipe } from '@/types/Recipe'
import type { recipeThumbnailType } from '@/types/RecipeThumbnail'

export class DBSqlite implements DBConnection {
  ready: boolean
  db?: Database

  constructor() {
    this.ready = false
  }
  listAllRecipes(): Promise<Array<recipeThumbnailType>> {
    throw new Error('Method not implemented.')
  }
  insertRecipe(recipe: Recipe): Promise<recipeThumbnailType> {
    throw new Error('Method not implemented.')
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

  // TODO: test error management
  #insertRecipeBody(recipe: Recipe) {
    const stmtRecBody = this.db!.prepare(insertLit.insertRecipe);
    let result
    try {
      const recipeId = stmtRecBody.getAsObject({
        ':name': recipe.title,
        ':description': recipe.description || null,
        ':yield': recipe.recipeYield! || null,
        ':prepTime': recipe.prepTime! || null,
        ':cookTime': recipe.cookTime! || null,
        ':difficulty': recipe.difficulty! || null
      })
      if (recipeId['id'] != null || recipeId['id'] != undefined) {
        result = {"recipeId": -1, "error": 'Recipe body insertion failed.'}
      }
      result = {"recipeId": recipeId['id'] as number, "error": ""}
    }
    catch (e){
      result = {"recipeId": -1, "error": 'Recipe body insertion failed. Cause: ' + e}
    }
    stmtRecBody.free()
    return result
  }

  #insertDirection(recipe: NewRecipe, recipeId: number){
    const stmtDirection = this.db!.prepare(insertLit.insertDirection);
    const stmtRecipeDirections = this.db!.prepare(insertLit.insertRecipeDirection);
    const stmtDirectionMedia = this.db!.prepare(insertLit.insertDirectionMedia);
    recipe.directions.forEach((dir) => {
      const directionId = stmtDirection.getAsObject({
        ":description": dir.description
      })
      stmtRecipeDirections.run({
        ":recipeId": recipeId,
        ":directionId": directionId['id'],
        ":position": dir.key
      })
      dir.media.forEach((media) => {
        stmtDirectionMedia.run({
          ":directionId": directionId['id'],
          ":position": media.order,
          ":url": media.url,
          ":description": media.description! || null
        })
      })
    });
    stmtDirection.free();
    stmtRecipeDirections.free();
    stmtDirectionMedia.free();
  }

  // TODO: Break into smaller functions
  // TODO: check the order of things gets infered from the indexes of the arrays where data is stored (see components section)
  async addRecipe(recipe: NewRecipe): Promise<void> {
    if (!this.ready) return Promise.reject('DB not ready')
    this.db!.run(sharedLit.beginTransaction)
    try {
      // 1. Insert recipe body
      let recipeBodyRes = this.#insertRecipeBody(recipe)
      if (recipeBodyRes.error) {
        throw new Error(recipeBodyRes.error)
      }
      const recipeId = recipeBodyRes.recipeId
      // Insert recipe media
      const stmtRecMed = this.db!.prepare(insertLit.insertRecipeMedia);
      recipe.media.forEach((media)=> {
        stmtRecMed.run({
          ":recipeId": recipeId,
          ":url": media.url,
          ":position": media.order,
          ":description": media.description! || null
        })
      })
      stmtRecMed.free();
      // Bond category onto recipe
      const stmtRecipeCategory = this.db!.prepare(insertLit.insertRecipeCategory);
      recipe.category.forEach((category)=> {
        stmtRecMed.run({
          ":recipeId": recipeId,
          ":category": category
        })
      })
      stmtRecipeCategory.free();
      // Insert tag
      const stmtTag = this.db!.prepare(insertLit.insertTag);
      const stmtRecipeTag = this.db!.prepare(insertLit.insertRecipeTag);
      recipe.tags.forEach((tag)=> {
        stmtTag.run({
          ":tag": tag.tag,
          ":color": tag.color
        })
        stmtRecipeTag.run({
          ":recipeId": recipeId,
          ":tag": tag.tag
        })
      })
      stmtTag.free();
      stmtRecipeTag.free();
      // Insert tools
      const stmtTool = this.db!.prepare(insertLit.insertTool);
      const stmtRecipeTool = this.db!.prepare(insertLit.insertRecipeTool);
      recipe.tools.forEach((tool) => {
        stmtTool.run({
          ":tool": tool.name
        })
        stmtRecipeTool.run({
          ":recipeId": recipeId,
          ":tool": tool.name,
          ":description": tool.description! || null
        })
      });
      stmtTool.free();
      stmtRecipeTool.free();
      // Insert ingredients
      const stmtIngredient = this.db!.prepare(insertLit.insertTool);
      const stmtRecipeIngredient = this.db!.prepare(insertLit.insertRecipeTool);
      recipe.ingredients.forEach((ingr) => {
        stmtIngredient.run({
          ":name": ingr.name
        })
        stmtRecipeIngredient.run({
          ":recipeId": recipeId,
          ":ingredient": ingr.name,
          ":position": ingr.key,
          ":units": ingr.units! || null,
          ":measur": ingr.measure! || null
        })
      });
      stmtIngredient.free();
      stmtRecipeIngredient.free();
      // Insert directions
      this.#insertDirection(recipe, recipeId)
      // Insert components
      const stmtRecipeComponent = this.db!.prepare(insertLit.insertRecipeComponent);
      recipe.components.forEach((comp, idx)=> {
        stmtRecMed.run({
          ":baseRecipe": recipeId,
          ":component": comp.id,
          ":position": idx
        })
      })
      stmtRecMed.free();
    }
    catch {
      console.log()
      this.db!.run(sharedLit.rollbackTransaction)
    }
    
    
    
    //return Promise.reject('DB not ready')
  }
 
}
