import type { Database } from "sql.js"
import { tableRecipes } from "./recipes"
import type { Recipe } from "@/types/Recipe"

// Table names
export const tableTools = `Tools`
export const tableRecipeTools = `RecipeTools`

// Table creation literals
export const createTableTools =
  `CREATE TABLE IF NOT EXISTS ` + tableTools + ` (
    tool TEXT PRIMARY KEY
  ) STRICT`

export const createTableRecipeTools =
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeTools + ` (
    recipeId INTEGER,
    tool TEXT,
    description TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + tableRecipes + `(id),
    FOREIGN KEY (tool) REFERENCES ` + tableTools + `(tool),
    PRIMARY KEY (recipeId, tool)
  ) STRICT`

// Table insertion literals
const insertTool = 
  `INSERT IGNORE INTO ` + tableTools + ` VALUES (
    :tool
  )`

const insertRecipeTool = 
  `INSERT INTO ` + tableRecipeTools + ` VALUES (
    :recipeId,
    :tool,
    :description
  )`

// Insertions
export function insertTools(db: Database, recipe: Recipe, recipeId: number): string {
  let error = ''
  const stmtTool = db.prepare(insertTool);
  const stmtRecipeTool = db.prepare(insertRecipeTool);
  try {
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
  }
  catch (e){
    error = 'Recipe tag insertion failed. Cause: ' + e
  }
  stmtTool.free();
  stmtRecipeTool.free();
  return error
}