import type { Database } from "sql.js"
import { tableRecipes } from "./recipes"
import type { Recipe } from "@/types/Recipe"

// Table names
export const tableCategories = `Categories`
export const tableRecipeCategory = `RecipeCategory`

// Table creation literals
const createTableCategories =
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

const createTableRecipeCategory =
  `CREATE TABLE IF NOT EXISTS ` + tableRecipeCategory + ` (
    recipeId INTEGER,
    category TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + tableRecipes + `(id),
    FOREIGN KEY (category) REFERENCES ` + tableCategories + `(category),
    PRIMARY KEY (recipeId, category)
  ) STRICT`

export function createTablesCategories(db: Database) {
  db.run(createTableCategories)
  db.run(createTableRecipeCategory)
}
 
// Table insertion literals
const insertRecipeCategory =
  `INSERT INTO ` + tableRecipeCategory + `(recipeId, category) VALUES (
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

// Queries
const selectRecipeCategories = 
  `SELECT category FROM ` + tableRecipeCategory + ` WHERE recipeId = :id ORDER BY category ASC`

const selectCategories = 
  `SELECT * FROM ` + tableCategories + ` ORDER BY category ASC`

export function getRecipeCategories(db: Database, recipeId: number, recipe: Recipe) {
  const stmtRecCat = db.prepare(selectRecipeCategories)
  try {
    const result = stmtRecCat.getAsObject({':id': `${recipeId}`}) as unknown as string[]
    recipe.category = result

    //recipe.title = result[0].values
    console.log('retrieved categories ' + JSON.stringify(result))
  }
  catch (e) {
    throw new Error('Get recipe categories failed. Cause: ' + e)
  }
}

export function getCategories(db: Database) {
  const stmtCat = db.prepare(selectCategories)
  try {
    const result = stmtCat.getAsObject() as unknown as string[]
    //recipe.title = result[0].values
    console.log('all categories ' + JSON.stringify(result))
    return result

  }
  catch (e) {
    throw new Error('Get all categories failed. Cause: ' + e)
  }
}
