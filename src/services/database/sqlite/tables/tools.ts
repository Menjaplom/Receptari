import type { Database } from "sql.js"
import { tableRecipes } from "./recipes"
import type { Recipe } from "@/types/Recipe"
import type { Tool } from "@/types/Tool"

// Table names
const tableTools = `Tools`
const tableRecipeTools = `RecipeTools`

// Table creation literals
const createTableTools =
  `CREATE TABLE IF NOT EXISTS ` + tableTools + ` (
    tool TEXT PRIMARY KEY
  ) STRICT`

const createTableRecipeTools =
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeTools + ` (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipeId INTEGER,
    tool TEXT NOT NULL,
    description TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + tableRecipes + `(id),
    FOREIGN KEY (tool) REFERENCES ` + tableTools + `(tool)
  ) STRICT`

export function createTablesTools(db: Database) {
  db.run(createTableTools)
  db.run(createTableRecipeTools)
}

// Table insertion literals
const insertTool =
  `INSERT OR IGNORE INTO ` + tableTools + `(tool)  VALUES (
    :tool
  )`

const insertRecipeTool = 
  `INSERT INTO ` + tableRecipeTools + `(recipeId, tool, description) VALUES (
    :recipeId,
    :tool,
    :description
  )`

// Insertions
export function insertTools(db: Database, recipe: Recipe, recipeId: number): void {
  const stmtTool = db.prepare(insertTool);
  const stmtRecipeTool = db.prepare(insertRecipeTool);
  try {
    recipe.tools.forEach((tool) => {
      stmtTool.run({
        ":tool": tool.name
      });
      stmtRecipeTool.run({
        ":recipeId": recipeId,
        ":tool": tool.name,
        ":description": tool.description ?? null
      })
    });
  }
  catch (e) {
    throw new Error('Recipe tool insertion failed. Cause: ' + e);
  }
  finally {
    stmtTool.free();
    stmtRecipeTool.free();
  }
}

// Queries
const selectRecipeTools = 
  `SELECT tool, description FROM ${tableRecipeTools}
   WHERE recipeId = :id`

export function getRecipeTools(db: Database, recipeId: number, recipe: Recipe) {
  const stmtRecTag = db.prepare(selectRecipeTools)
  try {
    const result = stmtRecTag.getAsObject({':id': `${recipeId}`}) as unknown as Tool[]
    recipe.tools = result

    //recipe.title = result[0].values
    console.log('retrieved tools ' + JSON.stringify(result))
  }
  catch (e) {
    throw new Error('Get recipe tools failed. Cause: ' + e)
  }
}
