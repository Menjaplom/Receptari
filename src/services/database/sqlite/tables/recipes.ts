import type { Recipe } from "@/types/Recipe";
import { insertDirection, insertRecipeDirection, insertDirectionMedia } from "./directions";
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

const insertRecipeMed =
`INSERT INTO ` + tableRecipeMedia + ` VALUES (
    :recipeId,
    :url,
    :position,
    :footer
)`

// Insertions
type RecipeInsertionResponse = {
  recipeId: number;
  error: string;
}

export function insertRecipeBody(db: Database, recipe: Recipe): RecipeInsertionResponse {
  let result = { recipeId: -1, error: "" }
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
    result.recipeId = recipeId['id']! as number
  }
  catch (e){
    result.error = 'Recipe body insertion failed. Cause: ' + e
  }
  stmtRecBody.free()
  return result
}

type RecipeMediaInsertionResponse = {
  thumbnailMedia: string;
  error: string;
}

export function insertRecipeMedia(db: Database, recipe: Recipe, recipeId: number): RecipeMediaInsertionResponse {
  let result = { thumbnailMedia: '', error: '' };
  const stmtRecMed = db.prepare(insertRecipeMed);
  try {
    recipe.media.forEach((media, idx)=> {
      if (!result.thumbnailMedia && isImage(media.url)) {
        result.thumbnailMedia = media.url
      }
      stmtRecMed.run({
        ":recipeId": recipeId,
        ":url": media.url,
        ":position": idx,
        ":description": media.footer ?? null
      })
    })
  }
  catch (e){
    result.error = 'Recipe media insertion failed. Cause: ' + e
  }
  stmtRecMed.free()
  return result
}