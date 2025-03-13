import type { Recipe } from "@/types/Recipe";
import type { Database } from "sql.js";
import { isImage } from "@/types/Media";

// Table name
export const tableRecipes = `Recipes`
export const tableRecipeMedia = `RecipeMedia`

// Table creation literal
export const createTableRecipes =  
  `CREATE TABLE IF NOT EXISTS ` + tableRecipes + ` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT, 
    yield INTEGER,
    prepTime INTEGER,
    cookTime INTEGER,
    difficulty INTEGER
  ) STRICT`

export const createTableRecipeMedia = 
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeMedia + ` (
    recipeId INTEGER,
    id INTEGER AUTOINCREMENT,
    url TEXT NOT NULL,
    position INTEGER NOT NULL,
    footer TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + tableRecipes + `(id),
    PRIMARY KEY (recipeId, id)
  ) STRICT`

// Table insertion literal
const insertRecipe =
  `INSERT INTO ` + tableRecipes + ` VALUES (
    :name,
    :description,
    :yield,
    :prepTime,
    :cookTime,
    :difficulty
  ) RETURNING id`

const insertRecipeMedia =
`INSERT INTO ` + tableRecipeMedia + ` VALUES (
    :recipeId,
    :url,
    :position,
    :footer
)`

// Insertions
export function insertRecipeBody(db: Database, recipe: Recipe): number {
  let result
  const stmtRecBody = db.prepare(insertRecipe);
  try {
    const recipeId = stmtRecBody.getAsObject({
      ':name': recipe.title,
      ':description': recipe.description ?? null,
      ':yield': recipe.recipeYield ?? null,
      ':prepTime': recipe.prepTime ?? null,
      ':cookTime': recipe.cookTime ?? null,
      ':difficulty': recipe.difficulty ?? null
    })
    result = recipeId['id']! as number
  }
  catch (e) {
    throw new Error('Recipe body insertion failed. Cause: ' + e)
  }
  finally {
    stmtRecBody.free()
  }
  return result
}

export function insertRecipeMedias(db: Database, recipe: Recipe, recipeId: number): string {
  let result = ''
  const stmtRecMed = db.prepare(insertRecipeMedia);
  try {
    recipe.media.forEach((media, idx)=> {
      if (!result && isImage(media.url)) {
        result = media.url
      }
      stmtRecMed.run({
        ":recipeId": recipeId,
        ":url": media.url,
        ":position": idx,
        ":description": media.footer ?? null
      })
    })
  }
  catch (e) {
    throw new Error('Recipe media insertion failed. Cause: ' + e)
  }
  finally {
    stmtRecMed.free()
  }
  return result
}