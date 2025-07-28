import type { Database } from "sql.js"
import { tableRecipes } from "./recipes"
import type { Recipe } from "@/types/Recipe"
import type { Tag } from "@/types/Tag"

// Table names
export const tableTags = `Tags`
export const tableRecipeTags = `RecipeTags`

// Table creation literals
const createTableTags =
  `CREATE TABLE IF NOT EXISTS ${tableTags} (
      tag TEXT PRIMARY KEY,
      color TEXT NOT NULL
  ) STRICT`

const createTableRecipeTags =
  `CREATE TABLE IF NOT EXISTS ${tableRecipeTags} (
    recipeId INTEGER,
    tag TEXT,
    FOREIGN KEY (recipeId) REFERENCES ${tableRecipes}(id),
    FOREIGN KEY (tag) REFERENCES ${tableTags}(tag),
    PRIMARY KEY (recipeId, tag)
  ) STRICT`

export function createTablesTags(db: Database) {
  db.run(createTableTags)
  db.run(createTableRecipeTags)
}

// Table insertion literals
const insertTag = 
  `INSERT INTO ${tableTags} VALUES (
    :tag,
    :color
  )`

const insertRecipeTag = 
  `INSERT INTO ${tableRecipeTags} VALUES (
    :recipeId,
    :tag
  )`

// Insertions
export function insertTags(db: Database, recipe: Recipe, recipeId: number): void {
  const stmtTag = db.prepare(insertTag)
  const stmtRecipeTag = db.prepare(insertRecipeTag)
  try {
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
  }
  catch (e) {
    throw new Error('Recipe tag insertion failed. Cause: ' + e)
  }
  finally {
    stmtTag.free()
    stmtRecipeTag.free()
  }
}

// Queries
const selectRecipeTags = 
  `SELECT t1.* FROM ${tableTags} t1, ${tableRecipeTags} t2
   WHERE t2.recipeId = :id AND t2.tag = t1.tag
   ORDER BY t1.tag ASC`

export function getRecipeTags(db: Database, recipeId: number, recipe: Recipe) {
  const stmtRecTag = db.prepare(selectRecipeTags)
  try {
    const result = stmtRecTag.getAsObject({':id': `${recipeId}`}) as unknown as Tag[]
    recipe.tags = result

    //recipe.title = result[0].values
    console.log('retrieved tags ' + JSON.stringify(result))
  }
  catch (e) {
    throw new Error('Get recipe tags failed. Cause: ' + e)
  }
}
