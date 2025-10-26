import type { Database } from 'sql.js'
import { tableRecipes } from './recipes'
import type { Recipe, RecipeAutocomplete } from '@/types/Recipe'

// Table names
export const tableCategories = `Categories`
export const tableRecipeCategory = `RecipeCategory`

// Table creation literals
const createTableCategories = `CREATE TABLE IF NOT EXISTS ${tableCategories} (
    category TEXT PRIMARY KEY
  ) STRICT;
  INSERT INTO ${tableCategories} (category) VALUES
    ('APPETIZER'),
    ('SOUP'),
    ('SALAD'),
    ('MAIN COURSE'),
    ('SIDE DISH'),
    ('DESSERT & BAKERY'),
    ('DRINK'),
    ('COMPONENT');
  `

const createTableRecipeCategory = `CREATE TABLE IF NOT EXISTS ${tableRecipeCategory} (
    recipeId INTEGER,
    category TEXT,
    FOREIGN KEY (recipeId) REFERENCES ${tableRecipes}(id),
    FOREIGN KEY (category) REFERENCES ${tableCategories}(category),
    PRIMARY KEY (recipeId, category)
  ) STRICT`

export function createTablesCategories(db: Database) {
  db.run(createTableCategories)
  db.run(createTableRecipeCategory)
}

// Table insertion literals
const insertRecipeCategory = `INSERT INTO ${tableRecipeCategory}(recipeId, category) VALUES (
    :recipeId,
    :category
  )`

// Insertions
export function insertRecipeCategories(db: Database, recipe: Recipe, recipeId: number): void {
  const stmtRecipeCategory = db.prepare(insertRecipeCategory)
  try {
    recipe.category.forEach((category) => {
      stmtRecipeCategory.run({
        ':recipeId': recipeId,
        ':category': category
      })
    })
  } catch (e) {
    throw new Error('Recipe category insertion failed. Cause: ' + e)
  } finally {
    stmtRecipeCategory.free()
  }
}

// Queries
const selectRecipeCategories = `SELECT category FROM ${tableRecipeCategory} WHERE recipeId = :id ORDER BY category ASC`

const selectCategories = `SELECT * FROM ${tableCategories} ORDER BY category ASC`

const selectAllComponents = `SELECT ${tableRecipes}.title, ${tableRecipes}.id
  FROM ${tableRecipes}
  INNER JOIN ${tableRecipeCategory} ON ${tableRecipes}.id = ${tableRecipeCategory}.recipeId
  WHERE ${tableRecipeCategory}.category = 'COMPONENT'
  ORDER BY ${tableRecipes}.title ASC`

export function getRecipeCategories(db: Database, recipeId: number, recipe: Recipe) {
  const stmtRecCat = db.prepare(selectRecipeCategories)
  try {
    const result = stmtRecCat.getAsObject({ ':id': `${recipeId}` }) as unknown as string[]
    recipe.category = result

    //recipe.title = result[0].values
    console.log('retrieved categories ' + JSON.stringify(result))
  } catch (e) {
    throw new Error('Get recipe categories failed. Cause: ' + e)
  }
}

export function getCategories(db: Database) {
  try {
    const result = db.exec(selectCategories)[0].values.flat() as string[]
    //console.log('all categories ' + JSON.stringify(result))
    return result
  } catch (e) {
    throw new Error('Get all categories failed. Cause: ' + e)
  }
}

export function getCategoryComponentsNames(db: Database): RecipeAutocomplete[] {
  const stmtCatComp = db.prepare(selectAllComponents)
  try {
    const result = stmtCatComp.getAsObject() as unknown as RecipeAutocomplete[]
    //console.log('all categories ' + JSON.stringify(result))
    return (result.values as unknown as RecipeAutocomplete[]) ?? ([] as RecipeAutocomplete[])
  } catch (e) {
    throw new Error('Get all categories failed. Cause: ' + e)
  }
}
