import { tableRecipes } from "./recipes"

// Table names
export const tableIngredients = `Ingredients`
export const tableRecipeIngredients = `RecipeIngredients`

// Table creation literals
export const createTableIngredients =
  `CREATE TABLE IF NOT EXISTS ` + tableIngredients + ` (
    name TEXT PRIMARY KEY
  )`

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
  )`

// Table insertion literals
export const insertIngredient = 
  `INSERT IGNORE INTO ` + tableIngredients + ` VALUES (
    :name
  )`

export const insertRecipeIngredient = 
  `INSERT INTO ` + tableRecipeIngredients + ` VALUES (
    :recipeId,
    :ingredient,
    :position,
    :units,
    :measure
  )`