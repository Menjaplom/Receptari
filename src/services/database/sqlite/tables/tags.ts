import type { Database } from "sql.js"
import { tableRecipes } from "./recipes"
import type { Recipe } from "@/types/Recipe"

// Table names
export const tableTags = `Tags`
export const tableRecipeTags = `RecipeTags`

// Table creation literals
export const createTableTags =
  `CREATE TABLE IF NOT EXISTS ` + tableTags + ` (
      tag TEXT PRIMARY KEY,
      color TEXT NOT NULL
  ) STRICT`

export const createTableRecipeTags =
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeTags + ` (
    recipeId INTEGER,
    tag TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + tableRecipes + `(id),
    FOREIGN KEY (tag) REFERENCES ` + tableTags + `(tag),
    PRIMARY KEY (recipeId, tag)
  ) STRICT`

// Table insertion literals
const insertTag = 
  `INSERT INTO ` + tableTags + ` VALUES (
    :tag,
    :color
  )`

const insertRecipeTag = 
  `INSERT INTO ` + tableRecipeTags + ` VALUES (
    :recipeId,
    :tag
  )`

// Insertions
export function insertTags(db: Database, recipe: Recipe, recipeId: number): string {
  let error = ''
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
  catch (e){
    error = 'Recipe tag insertion failed. Cause: ' + e
  }
  stmtTag.free()
  stmtRecipeTag.free()
  return error
}