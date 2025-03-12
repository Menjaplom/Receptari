import { tableRecipes } from "./recipes"

// Table name
export const tableRecipeMedia = `RecipeMedia`

// Table creation literal
export const createTableRecipeMedia = 
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeMedia + ` (
    recipeId INTEGER,
    id INTEGER,
    url TEXT NOT NULL,
    position INTEGER NOT NULL,
    footer TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + tableRecipes + `(id),
    PRIMARY KEY (recipeId, id)
  )`

// Table insertion literal
export const insertRecipeMedia =
`INSERT INTO ` + tableRecipeMedia + ` VALUES (
    :recipeId,
    :url,
    :position,
    :footer
)`