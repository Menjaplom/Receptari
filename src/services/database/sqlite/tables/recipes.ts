import type { Recipe } from "@/types/Recipe";
import type { Database } from "sql.js";
import { isImage } from "@/types/Media";
import type { RecipeThumbnail } from "@/types/RecipeThumbnail";
import { defaultRecipeImg } from "@/literals";

// Table name
export const tableRecipes = `Recipes`
export const tableRecipeMedia = `RecipeMedia`

// Table creation literal
export const createTableRecipes =  
  `CREATE TABLE IF NOT EXISTS ` + tableRecipes + ` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT, 
    yieldUnits INTEGER,
    yieldMeasure TEXT,
    prepTime TEXT,
    cookTime TEXT,
    difficulty INTEGER
  ) STRICT`

export const createTableRecipeMedia = 
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeMedia + ` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipeId INTEGER,
    url TEXT NOT NULL,
    position INTEGER NOT NULL,
    footer TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + tableRecipes + `(id)
  ) STRICT`


// Insertions
const insertRecipe =
  `INSERT INTO ` + tableRecipes + `(title, description, yield, prepTime, cookTime, difficulty) VALUES (
    :title,
    :description,
    :yield,
    :prepTime,
    :cookTime,
    :difficulty
  ) RETURNING id`

const insertRecipeMedia =
`INSERT INTO ` + tableRecipeMedia + `(recipeId, url, position, footer) VALUES (
    :recipeId,
    :url,
    :position,
    :footer
)`

export function insertRecipeBody(db: Database, recipe: Recipe): number {
  let result
  const stmtRecBody = db.prepare(insertRecipe);
  try {
    const recipeId = stmtRecBody.getAsObject({
      ':title': recipe.title,
      ':description': recipe.description ?? null,
      ':yieldUnits': recipe.yield.units ?? null,
      ':yieldMeasure': recipe.yield.measure ?? null,
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


// Queries
const selectAllRecipesBasic = 
  `SELECT id, title FROM ` + tableRecipes + ` ORDER BY title ASC`

const selectRecipeMediaUrl = 
  `SELECT url FROM ` + tableRecipeMedia + ` WHERE recipeId = :id ORDER BY position ASC`

export function getAllRecipeThumbnails(db: Database): Array<RecipeThumbnail> {
  let thumbArr: Array<RecipeThumbnail> = []
  try {
    let result = db.exec(selectAllRecipesBasic)
    const idIdx= result[0].columns.findIndex((e)=> e == 'id') as number
    const titleIdx = result[0].columns.findIndex((e)=> e == 'title') as number
    thumbArr = result[0].values.map((thumb) => {
      let recipeId = thumb[idIdx] as number
      const stmtRecMedUrl = db.prepare(selectRecipeMediaUrl);
      stmtRecMedUrl.bind([recipeId]);
      while (stmtRecMedUrl.step()) {
        let value = stmtRecMedUrl.get()
        console.log(JSON.stringify(value));
        if (isImage(value[0] as string)) {
          return {
            id: recipeId,
            title: thumb[titleIdx] as string,
            media: value[0] as string
          }
        }
      }
      return {
        id: recipeId,
        title: thumb[titleIdx] as string,
        media: defaultRecipeImg as string
      }
    })
  }
  catch (e) {
    throw new Error('Get recipe thumbnails failed. Cause: ' + e)
  }
  return thumbArr
}