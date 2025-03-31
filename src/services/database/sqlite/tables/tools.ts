import type { Database } from "sql.js"
import { tableRecipes } from "./recipes"
import type { Recipe } from "@/types/Recipe"

// Table names
export const tableTools = `Tools`
export const tableRecipeTools = `RecipeTools`

// Table creation literals
export const createTableRecipeTools =
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeTools + ` (
    recipeId INTEGER,
    tool TEXT NOT NULL,
    FOREIGN KEY (recipeId) REFERENCES ` + tableRecipes + `(id),
    PRIMARY KEY (recipeId, tool)
  ) STRICT`

// Table insertion literals
const insertRecipeTool = 
  `INSERT INTO ` + tableRecipeTools + ` VALUES (
    :recipeId,
    :tool
  )`

// Insertions
export function insertTools(db: Database, recipe: Recipe, recipeId: number): void {
  const stmtRecipeTool = db.prepare(insertRecipeTool);
  try {
    recipe.tools.forEach((tool) => {
      stmtRecipeTool.run({
        ":recipeId": recipeId,
        ":tool": tool.name
      })
    });
  }
  catch (e) {
    throw new Error('Recipe tool insertion failed. Cause: ' + e)
  }
  finally {
    stmtRecipeTool.free();
  }
}