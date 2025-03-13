import type { Database } from "sql.js";
import { tableRecipes } from "./recipes"
import type { Recipe } from "@/types/Recipe";

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
const insertRecipeComponent =
  `INSERT INTO ` + tableRecipeComponents + ` VALUES (
      :baseRecipe,
      :component,
      :position
    )`

// Insertions
export function insertComponents(db: Database, recipe: Recipe, recipeId: number): void {
  const stmtRecipeComponent = db.prepare(insertRecipeComponent);
  try {
    recipe.components.forEach((comp, idx)=> {
      stmtRecipeComponent.run({
        ":baseRecipe": recipeId,
        ":component": comp.id,
        ":position": idx
      })
    })
  }
  catch (e) {
    throw new Error('Recipe component insertion failed. Cause: ' + e)
  }
  finally {
    stmtRecipeComponent.free();
  }
}