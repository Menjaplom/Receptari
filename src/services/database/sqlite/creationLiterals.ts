import  * as table from "./sharedLiterals"


export const createTableRecipes =  
  `CREATE TABLE IF NOT EXISTS ` + table.recipes + ` (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    yield INTEGER,
    prepTime INTEGER,
    cookTime INTEGER,
    difficulty INTEGER
  )`

export const createTableRecipeMedia = 
  `CREATE TABLE IF NOT EXISTS ` + table.recipeMedia + ` (
    recipeId INTEGER,
    id INTEGER,
    url TEXT NOT NULL,
    position INTEGER NOT NULL,
    description TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + table.recipes + `(id),
    PRIMARY KEY (recipeId, id)
  )`

export const createTableCategories =
  `CREATE TABLE IF NOT EXISTS ` + table.categories + ` (
    category TEXT PRIMARY KEY
  );
  INSERT INTO ` + table.categories + ` VALUES
    ('APPETIZER'),
    ('SOUP'),
    ('SALAD'),
    ('MAIN COURSE'),
    ('SIDE DISH'),
    ('DESSERT & BAKERY'),
    ('DRINK');
  `

export const createTableRecipeCategory =
  `CREATE TABLE IF NOT EXISTS ` + table.recipeCategory + ` (
    recipeId INTEGER,
    category TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + table.recipes + `(id),
    FOREIGN KEY (category) REFERENCES ` + table.categories + `(category),
    PRIMARY KEY (recipeId, category)
  )`

export const createTableTags =
  `CREATE TABLE IF NOT EXISTS ` + table.tags + ` (
      tag TEXT PRIMARY KEY,
      color TEXT NOT NULL
  )`

export const createTableRecipeTags =
  `CREATE TABLE IF NOT EXISTS ` + table.recipeTags + ` (
    recipeId INTEGER,
    tag TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + table.recipes + `(id),
    FOREIGN KEY (tag) REFERENCES ` + table.tags + `(tag),
    PRIMARY KEY (recipeId, tag)
  )`

export const createTableTools =
  `CREATE TABLE IF NOT EXISTS ` + table.tools + ` (
    tool TEXT PRIMARY KEY
  )`

export const createTableRecipeTools =
  `CREATE TABLE IF NOT EXISTS ` + table.recipeTools + ` (
    recipeId INTEGER,
    tool TEXT,
    description TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + table.recipes + `(id),
    FOREIGN KEY (tool) REFERENCES ` + table.tools + `(tool),
    PRIMARY KEY (recipeId, tool)
  )`

export const createTableIngredients =
  `CREATE TABLE IF NOT EXISTS ` + table.ingredients + ` (
    name TEXT PRIMARY KEY
  )`

export const createTableRecipeIngredients =
  `CREATE TABLE IF NOT EXISTS ` + table.recipeIngredients + ` (
    recipeId INTEGER,
    ingredient text,
    position INTEGER NOT NULL,
    units INTEGER,
    measure TEXT,
    FOREIGN KEY (recipeId) REFERENCES ` + table.recipes + `(id),
    FOREIGN KEY (ingredient) REFERENCES ` + table.ingredients + `(name),
    PRIMARY KEY (recipeId, ingredient)
  )`

export const createTableDirections =
  `CREATE TABLE IF NOT EXISTS ` + table.directions + ` (
    id INTEGER PRIMARY KEY,
    description TEXT NOT NULL
  )`

export const createTableRecipeDirections =
  `CREATE TABLE IF NOT EXISTS ` + table.recipeDirections + ` (
    recipeId INTEGER,
    directionId INTEGER,
    position INTEGER NOT NULL,
    FOREIGN KEY (recipeId) REFERENCES ` + table.recipes + `(id),
    FOREIGN KEY (directionId) REFERENCES ` + table.directions + `(id),
    PRIMARY KEY (recipeId, directionId)
  )`

export const createTableDirectionMedia =
  `CREATE TABLE IF NOT EXISTS ` + table.directionMedia + ` (
    directionId INTEGER,
    id INTEGER,
    position INTEGER NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    FOREIGN KEY (directionId) REFERENCES ` + table.directions + `(id),
    PRIMARY KEY (directionId, id)
  )`

export const createTableRecipeComponents =
  `CREATE TABLE IF NOT EXISTS ` + table.recipeComponents + ` (
    baseRecipe INTEGER,
    component INTEGER,
    position INTEGER NOT NULL,
    FOREIGN KEY (baseRecipe) REFERENCES ` + table.recipes + `(id),
    FOREIGN KEY (component) REFERENCES ` + table.recipes + `(id),
    PRIMARY KEY (baseRecipe, component)
  )`


