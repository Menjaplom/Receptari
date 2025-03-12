export const tableRecipes = `Recipes`

// Table creation literal
export const createTableRecipes =  
  `CREATE TABLE IF NOT EXISTS ` + tableRecipes + ` (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT, 
    yield INTEGER,
    prepTime INTEGER,
    cookTime INTEGER,
    difficulty INTEGER
  )`

// Table insertion literal
export const insertRecipe =
  `INSERT INTO ` + tableRecipes + ` VALUES (
    :name,
    :description,
    :yield,
    :prepTime,
    :cookTime,
    :difficulty
  ) RETURNING id`