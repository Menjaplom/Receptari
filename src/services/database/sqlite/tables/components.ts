import { tableRecipes } from "./recipes"

// Table names
export const tableRecipeComponents = `RecipeComponents`

// Table creation literals
export const createTableRecipeComponents =
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeComponents + ` (
    baseRecipe INTEGER,
    component INTEGER,
    position INTEGER NOT NULL,
    FOREIGN KEY (baseRecipe) REFERENCES ` + tableRecipes + `(id),
    FOREIGN KEY (component) REFERENCES ` + tableRecipes + `(id),
    PRIMARY KEY (baseRecipe, component)
  ) STRICT`

// Table insertion literals
export const insertRecipeComponent =
  `INSERT INTO ` + tableRecipeComponents + ` VALUES (
      :baseRecipe,
      :component,
      :position
    )`