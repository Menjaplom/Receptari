import type { Database } from "sql.js"
import { tableRecipes } from "./recipes"
import type { Recipe } from "@/types/Recipe"

// Table names
export const tableCategories = `Categories`
export const tableRecipeCategory = `RecipeCategory`

// Table creation literals
export const createTableCategories =
  `CREATE TABLE IF NOT EXISTS ` + tableCategories + ` (
    category TEXT PRIMARY KEY
  ) STRICT;
  INSERT INTO ` + tableCategories + ` VALUES
    ('APPETIZER'),
    ('SOUP'),
    ('SALAD'),
    ('MAIN COURSE'),
    ('SIDE DISH'),
    ('DESSERT & BAKERY'),
    ('DRINK');
  `

export const createTableRecipeCategory =
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeCategory + ` (
    recipeId INTEGER,
    category TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + tableRecipes + `(id),
    FOREIGN KEY (category) REFERENCES ` + tableCategories + `(category),
    PRIMARY KEY (recipeId, category)
  ) STRICT`

// Table insertion literals
const insertRecipeCategory =
  `INSERT INTO ` + tableRecipeCategory + ` VALUES (
    :recipeId,
    :category
  )`

// Insertions
export function insertRecipeCategories(db: Database, recipe: Recipe, recipeId: number): void {
  const stmtRecipeCategory = db.prepare(insertRecipeCategory);
  try {
    recipe.category.forEach((category)=> {
      stmtRecipeCategory.run({
        ":recipeId": recipeId,
        ":category": category
      })
    })
  }
  catch (e) {
    throw new Error('Recipe category insertion failed. Cause: ' + e)
  }
  finally {
    stmtRecipeCategory.free();
  }
}