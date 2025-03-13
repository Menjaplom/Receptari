import type { Database } from "sql.js"
import { tableRecipes } from "./recipes"
import type { Recipe } from "@/types/Recipe"

// Table names
export const tableIngredients = `Ingredients`
export const tableRecipeIngredients = `RecipeIngredients`

// Table creation literals
export const createTableIngredients =
  `CREATE TABLE IF NOT EXISTS ` + tableIngredients + ` (
    name TEXT PRIMARY KEY
  ) STRICT`

export const createTableRecipeIngredients =
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeIngredients + ` (
    recipeId INTEGER,
    ingredient text,
    position INTEGER NOT NULL,
    units INTEGER,
    measure TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + tableRecipes + `(id),
    FOREIGN KEY (ingredient) REFERENCES ` + tableIngredients + `(name),
    PRIMARY KEY (recipeId, ingredient)
  ) STRICT`

// Table insertion literals
const insertIngredient = 
  `INSERT IGNORE INTO ` + tableIngredients + ` VALUES (
    :name
  )`

const insertRecipeIngredient = 
  `INSERT INTO ` + tableRecipeIngredients + ` VALUES (
    :recipeId,
    :ingredient,
    :position,
    :units,
    :measure
  )`


// Insertions
export function insertIngredients(db: Database, recipe: Recipe, recipeId: number): void {
  const stmtIngredient = db.prepare(insertIngredient);
  const stmtRecipeIngredient = db.prepare(insertRecipeIngredient);
  try {
    recipe.ingredients.forEach((ingr, idx) => {
      stmtIngredient.run({
        ":name": ingr.name
      })
      stmtRecipeIngredient.run({
        ":recipeId": recipeId,
        ":ingredient": ingr.name,
        ":position": idx,
        ":units": ingr.units ?? null,
        ":measur": ingr.measure ?? null
      })
    });
  }
  catch (e) {
    throw new Error('Recipe ingredient insertion failed. Cause: ' + e)
  }
  finally {
    stmtIngredient.free();
    stmtRecipeIngredient.free();
  }
}
