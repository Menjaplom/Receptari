import { tableRecipes } from "./recipes"

// Table names
export const tableTools = `Tools`
export const tableRecipeTools = `RecipeTools`

// Table creation literals
export const createTableTools =
  `CREATE TABLE IF NOT EXISTS ` + tableTools + ` (
    tool TEXT PRIMARY KEY
  )`

export const createTableRecipeTools =
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeTools + ` (
    recipeId INTEGER,
    tool TEXT,
    description TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + tableRecipes + `(id),
    FOREIGN KEY (tool) REFERENCES ` + tableTools + `(tool),
    PRIMARY KEY (recipeId, tool)
  )`

// Table insertion literals
export const insertTool = 
  `INSERT IGNORE INTO ` + tableTools + ` VALUES (
    :tool
  )`

export const insertRecipeTool = 
  `INSERT INTO ` + tableRecipeTools + ` VALUES (
    :recipeId,
    :tool,
    :description
  )`