import { tableRecipes } from "./recipes"

// Table names
export const tableCategories = `Categories`
export const tableRecipeCategory = `RecipeCategory`

// Table creation literals
export const createTableCategories =
  `CREATE TABLE IF NOT EXISTS ` + tableCategories + ` (
    category TEXT PRIMARY KEY
  );
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
  )`

// Table insertion literals
export const insertRecipeCategory =
  `INSERT INTO ` + tableRecipeCategory + ` VALUES (
    :recipeId,
    :category
  )`
