import { dbNameLit, dbURLLit } from '@/literals'
import * as dbLit from '@/services/database/sqlite/db_literals'
import { type dbConnection } from '../dbInterface'
import initSqlJs, { type Database } from 'sql.js'

export class DBSqlite implements dbConnection {
  ready: boolean
  db?: Database

  constructor() {
    this.ready = false
  }

  async connect(dbName: string): Promise<void> {
    const sqlPromise = initSqlJs()
    const fetchPromise = fetch(dbURLLit)
    const [SQL, fetchResponse] = await Promise.all([sqlPromise, fetchPromise])
    if (!fetchResponse.ok) {
      this.db = new SQL.Database()
      this.db.run(dbLit.createTableRecipes)
      console.log('Table Recipes created.')
      this.db.run(dbLit.createTableRecipeMedia)
      console.log('Table RecipeMedia created.')
      this.db.run(dbLit.createTableCategories)
      console.log('Table Categories created.')
      this.db.run(dbLit.createTableRecipeCategory)
      console.log('Table RecipeCategory created.')
      this.db.run(dbLit.createTableTags)
      console.log('Table TableTags created.')
      this.db.run(dbLit.createTableRecipeTags)
      console.log('Table RecipeTags created.')
      this.db.run(dbLit.createTableTools)
      console.log('Table Tools created.')
      this.db.run(dbLit.createTableRecipeTools)
      console.log('Table RecipeTools created.')
      this.db.run(dbLit.createTableIngredients)
      console.log('Table Ingredients created.')
      this.db.run(dbLit.createTableRecipeIngredients)
      console.log('Table RecipeIngredients created.')
      this.db.run(dbLit.createTableDirections)
      console.log('Table Directions created.')
      this.db.run(dbLit.createTableRecipeDirections)
      console.log('Table RecipeDirections created.')
      this.db.run(dbLit.createTableDirectionMedia)
      console.log('Table DirectionMedia created.')
      this.db.run(dbLit.createTableRecipeComponents)
      console.log('Table RecipeComponents created.')
      this.ready = true
    } else {
      const dbArr = await fetchResponse.arrayBuffer().then((arr) => new Uint8Array(arr))
      this.db = new SQL.Database(dbArr)
      this.ready = true
    }

    return Promise.resolve()
  }
}
